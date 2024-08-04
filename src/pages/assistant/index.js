// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import AssistantPage from '@/components/assistantPage/assistantPage'
export default function Assistant() {
  return (
    <AuthorizedLayout>
      <AssistantPage />
    </AuthorizedLayout>
  )
}
