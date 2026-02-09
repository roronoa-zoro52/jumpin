import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function scheduleTaskNotification(title: string, body: string) {
  if (Platform.OS === 'web') return

  const { status } = await Notifications.getPermissionsAsync()
  let finalStatus = status

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync()
    finalStatus = newStatus
  }

  if (finalStatus !== 'granted') {
    return
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null, // show immediately
  })
}
