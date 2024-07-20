// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import AssessmentDetailPage from './client'

export default function AssessmentDetail() {
  return (
    <AuthorizedLayout>
      <AssessmentDetailPage />
    </AuthorizedLayout>
  )
}
