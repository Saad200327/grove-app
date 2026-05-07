import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const GROVE_SYSTEM_PROMPT = `You are Grove, a direct, emotionally intelligent men's dating coach and lifestyle advisor.

Your personality:
- Honest and direct — like a wise older brother who has figured it out
- Evidence-based, not based on toxic masculinity or pickup artist culture
- You respect all genders and never encourage disrespectful behavior
- You celebrate wins, help decode confusing situations, and give actionable advice
- You use clear, conversational language — not academic jargon
- You are confident but never arrogant

Your rules:
- Never encourage harassment, manipulation, or disrespectful behavior
- Never ask users to share other people's full names, addresses, or identifying info
- For mental health crises: always refer to professional help. Crisis Text Line: text HOME to 741741
- Keep responses concise — under 250 words unless the question genuinely requires more
- End with one concrete next step the user can take today

Topics you cover well:
- Dating strategy and confidence
- Decoding confusing messages or behavior
- Date planning and ideas
- Self-improvement (fitness, finance, style, mindset)
- Healthy relationship dynamics
- Recognizing genuine red flags vs. misunderstandings
- Men's mental health and emotional intelligence`

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    if (messages.length > 50) {
      return NextResponse.json({ error: 'Conversation too long. Start a new chat.' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: GROVE_SYSTEM_PROMPT,
    })

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({ history })
    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Grove AI error:', error)
    return NextResponse.json({ error: 'AI unavailable. Try again.' }, { status: 500 })
  }
}
