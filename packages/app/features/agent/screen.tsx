'use client'

import {
  Button,
  H1,
  H3,
  Input,
  Paragraph,
  Separator,
  TextArea,
  XStack,
  YStack,
  Card,
  Spinner,
} from '@my/ui'
import { Check, MessageSquare, DollarSign, Calendar, User } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { type TaskExtraction, TaskExtractionSchema } from './schema'
import { getBaseUrl } from 'app/utils/baseUrl'
import * as Haptics from 'expo-haptics'
import { scheduleTaskNotification } from 'app/utils/notifications'

export function ChatToTaskScreen() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState<TaskExtraction | null>(null)

  const handleExtract = async () => {
    if (!message.trim()) return
    const url = `${getBaseUrl()}/api/agent`
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      const parsedData = TaskExtractionSchema.parse(data)
      setTask(parsedData)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      await scheduleTaskNotification('Task Created', `Task "${data.title}" has been saved.`)
    } catch (err) {
      console.error(err)
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack
      flex={1}
      justify="center"
      items="center"
      gap="$8"
      p="$4"
      bg="$background"
    >
      <YStack
        gap="$4"
        width="100%"
        maxWidth={600}
      >
        <H1
          text="center"
          color="$color12"
        >
          SyncAI Prototype
        </H1>
        <Paragraph
          color="$color10"
          text="center"
        >
          Turn your chat messages into trackable tasks instantly.
        </Paragraph>
        <Separator />
      </YStack>

      <YStack
        gap="$4"
        width="100%"
        maxWidth={600}
      >
        <TextArea
          value={message}
          onChangeText={setMessage}
          placeholder="Paste a chat message here (e.g., 'Hey @john, please finish the logo by Friday for 100 USDC')"
          size="$4"
          height={120}
        />
        <Button
          onPress={handleExtract}
          disabled={loading || !message.trim()}
          icon={loading ? <Spinner /> : <Check />}
        >
          {loading ? 'Processing...' : 'Extract Task'}
        </Button>
      </YStack>

      {task && (
        <Card
          width="100%"
          maxWidth={600}
          p="$4"
          bg="$backgroundHover"
        >
          <YStack gap="$4">
            <XStack
              gap="$2"
              items="center"
            >
              <MessageSquare
                size={20}
                color="$orange10"
              />
              <H3>{task.title}</H3>
            </XStack>

            <Paragraph color="$color11">{task.description}</Paragraph>

            <Separator />

            <XStack
              gap="$4"
              flexWrap="wrap"
            >
              {task.amount && (
                <XStack
                  gap="$2"
                  items="center"
                >
                  <DollarSign
                    size={18}
                    color="$green10"
                  />
                  <Paragraph fontWeight="bold">
                    {task.amount} {task.currency}
                  </Paragraph>
                </XStack>
              )}

              {task.deadline && (
                <XStack
                  gap="$2"
                  items="center"
                >
                  <Calendar
                    size={18}
                    color="$blue10"
                  />
                  <Paragraph fontSize="$2">{task.deadline}</Paragraph>
                </XStack>
              )}

              {task.assignee && (
                <XStack
                  gap="$2"
                  items="center"
                >
                  <User
                    size={18}
                    color="$purple10"
                  />
                  <Paragraph fontSize="$2">{task.assignee}</Paragraph>
                </XStack>
              )}
            </XStack>
          </YStack>
        </Card>
      )}
    </YStack>
  )
}
