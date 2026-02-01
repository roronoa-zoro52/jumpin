import { NextResponse } from 'next/server'
import { ChatAnthropic } from '@langchain/anthropic'
import { TaskExtractionSchema } from 'app/features/agent/schema'

export async function POST(req: Request) {
    try {
        const { message } = await req.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        const model = new ChatAnthropic({
            modelName: 'claude-3-5-sonnet-20240620',
            anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        })

        const structuredModel = model.withStructuredOutput(TaskExtractionSchema)

        const result = await structuredModel.invoke([
            {
                role: 'system',
                content: `You are a high-performance task extraction engine for SyncAI Protocol.
        Your goal is to turn disorganized chat messages into structured task data.
        If a deadline, amount, currency, or assignee is mentioned, extract it.
        If not mentioned, leave those fields undefined.`,
            },
            {
                role: 'user',
                content: message,
            },
        ])

        return NextResponse.json(result)
    } catch (error) {
        console.error('Agent Error:', error)
        return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
    }
}
