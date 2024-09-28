// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import Page from '@/components/page'
import QuizDashboardPage from '@/components/quizStatistics/quizDashboardPage'
import PerformancePage from '@/components/performancePage/performancePage'
import { SelectedStudentsProvider } from '@/components/performancePage/selectedStudentsContext'
import ViewPage from '@/components/performancePage/viewPage'
export default function Dashboard() {
  return (
    <>
      <Page title="Quiz" description="Quiz page" />
      <AuthorizedLayout>
        <ViewPage />
      </AuthorizedLayout>
    </>
  )
}
