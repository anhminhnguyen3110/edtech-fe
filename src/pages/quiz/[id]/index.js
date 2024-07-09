// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import QuizCreator from './client'
export default function Quiz() {
  return (
    <AuthorizedLayout>
      <QuizCreator />
    </AuthorizedLayout>
  )
}
