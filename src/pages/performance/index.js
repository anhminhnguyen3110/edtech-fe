// pages/quiz/index.js
import AuthPerformanceLayout from '@/components/layout/AuthPerformanceLayout'
import Page from '@/components/page'
import QuizDashboardPage from '@/components/quizStatistics/quizDashboardPage'
import PerformancePage from '@/components/performancePage/performancePage'
import { SelectedStudentsProvider } from '@/components/performancePage/selectedStudentsContext'
export default function Dashboard() {
  return (
    <>
      <Page title="Quiz" description="Quiz page" />
      <SelectedStudentsProvider>
        <AuthPerformanceLayout>
          <PerformancePage /> {/* Ensure that this component uses PlayerCard */}
        </AuthPerformanceLayout>
      </SelectedStudentsProvider>
    </>
  )
}
