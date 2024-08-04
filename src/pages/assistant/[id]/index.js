// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import AssistantPage from '@/components/assistantPage/assistantPage'
import ChatPage from '@/components/chatPage/chatPage'
export default function Chat() {
  return (
    <AuthorizedLayout>
      <ChatPage />
    </AuthorizedLayout>
  )
}
