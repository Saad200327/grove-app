-- Hardened RLS policies (Prompt 7)

DROP POLICY IF EXISTS "Public usernames visible" ON public.users;

CREATE POLICY "Users can read public profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can only see own subscription" ON public.users
  FOR SELECT
  USING (
    CASE
      WHEN auth.uid()::text = firebase_uid THEN true
      ELSE (stripe_customer_id IS NULL)
    END
  );

CREATE OR REPLACE FUNCTION delete_expired_posts()
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE public.posts SET is_deleted = true
  WHERE expires_at < NOW() AND is_deleted = false;
$$;
