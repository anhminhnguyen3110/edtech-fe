// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import QuizCreator from './client'
import Page from '@/components/page'
export default function QuizDetail() {
  return (
    <>
      <Page title="Quiz Detail" description="Quiz detail page" />
      <AuthorizedLayout>
        <QuizCreator />
      </AuthorizedLayout>
    </>
  )
}
