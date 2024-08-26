// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import { AssessmentPage } from './client'
import Page from '@/components/page'

export default function Assessment() {
  return (
    <div className="app">
      <Page title="Assessment" description="Assessment Page" />
      <AuthorizedLayout>
        <AssessmentPage />
      </AuthorizedLayout>
    </div>
  )
}
