// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import AssessmentDetailPage from './client'
import Page from '@/components/page'
export default function AssessmentDetail() {
  return (
    <>
      <Page title="Assessment Detail" description="Assessment detail page" />
      <AuthorizedLayout>
        <AssessmentDetailPage />
      </AuthorizedLayout>
    </>
  )
}
