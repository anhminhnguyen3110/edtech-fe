// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import Page from '@/components/page'
import GameDetail from '@/components/gameDashboard/gameDetail'

export default function Quiz() {
  return (
    <>
      <Page title="Quiz Dashboard" description="Quiz page" />
      <AuthorizedLayout>
        <GameDetail />
      </AuthorizedLayout>
    </>
  )
}
