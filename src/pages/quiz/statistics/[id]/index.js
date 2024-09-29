// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import Page from '@/components/page'
import QuizDashboardPage from '@/components/quizStatistics/quizDashboardPage'
export default function Quiz() {
  return (
    <>
      <Page title="Quiz Statistics" description="Quiz statistics page" />
      <AuthorizedLayout>
        <QuizDashboardPage />
      </AuthorizedLayout>
    </>
  )
}
