-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS TABLE (minimal PII by design — no ID photos ever)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL CHECK (length(username) >= 3 AND length(username) <= 30),
  city TEXT,
  age_range TEXT CHECK (age_range IN ('18-24','25-30','31-36','37-44','45+')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free','grove_plus','grove_pro')),
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  avatar_color TEXT DEFAULT '#C9A84C',
  avatar_initials TEXT,
  is_banned BOOLEAN DEFAULT FALSE,
  ban_reason TEXT,
  is_verified_expert BOOLEAN DEFAULT FALSE,
  expert_credentials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('green_flag','red_flag','dating_win','decode_help','scene_report','expert_tip')),
  title TEXT NOT NULL CHECK (length(title) <= 120),
  content TEXT NOT NULL CHECK (length(content) <= 2000),
  city TEXT,
  tags TEXT[] DEFAULT '{}',
  is_anonymous BOOLEAN DEFAULT TRUE,
  ai_moderation_score FLOAT DEFAULT 0,
  ai_moderation_flags TEXT[] DEFAULT '{}',
  human_reviewed BOOLEAN DEFAULT FALSE,
  human_approved BOOLEAN,
  helpful_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  save_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  is_deleted BOOLEAN DEFAULT FALSE
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 500),
  is_anonymous BOOLEAN DEFAULT TRUE,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- HELPFUL VOTES (no double voting)
CREATE TABLE IF NOT EXISTS public.helpful_votes (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- SAVED POSTS
CREATE TABLE IF NOT EXISTS public.saved_posts (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- AI USAGE TRACKING (for rate limiting free tier)
CREATE TABLE IF NOT EXISTS public.ai_usage (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  message_count INT DEFAULT 0,
  PRIMARY KEY (user_id, month)
);

-- CONTENT REPORTS
CREATE TABLE IF NOT EXISTS public.content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES public.users(id),
  content_type TEXT CHECK (content_type IN ('post','comment')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('harassment','defamation','doxxing','spam','misinformation','other')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolution TEXT
);

-- SUBSCRIPTIONS LOG
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_event_id TEXT UNIQUE,
  event_type TEXT,
  tier TEXT,
  amount_cents INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_city ON public.posts(city);
CREATE INDEX IF NOT EXISTS idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_expires ON public.posts(expires_at);
CREATE INDEX IF NOT EXISTS idx_posts_user ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);

-- ROW LEVEL SECURITY
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helpful_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid()::text = firebase_uid);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = firebase_uid);
CREATE POLICY "Public usernames visible" ON public.users FOR SELECT USING (true);

CREATE POLICY "Anyone can read approved posts" ON public.posts FOR SELECT USING (is_deleted = false AND (human_approved = true OR human_reviewed = false));
CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can delete own posts" ON public.posts FOR DELETE USING (auth.uid()::text = (SELECT firebase_uid FROM public.users WHERE id = user_id));

CREATE POLICY "Anyone can read comments" ON public.comments FOR SELECT USING (is_deleted = false);
CREATE POLICY "Authenticated users can comment" ON public.comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
