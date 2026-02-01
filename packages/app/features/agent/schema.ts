import { z } from 'zod'

export const TaskExtractionSchema = z.object({
  title: z.string().describe('The short, descriptive title of the task'),
  description: z.string().describe('Detailed description of what needs to be done'),
  deadline: z.string().optional().describe('The deadline or date mentioned (in ISO format or human readable)'),
  amount: z.number().optional().describe('The payment amount mentioned'),
  currency: z.string().optional().describe('The currency (e.g., USDC, SOL, USD)'),
  assignee: z.string().optional().describe('The person mentioned to do the task'),
})

export type TaskExtraction = z.infer<typeof TaskExtractionSchema>
