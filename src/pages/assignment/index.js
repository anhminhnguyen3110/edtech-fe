// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import { AssessmentPage } from './client'
export default function Assessment() {
  return (
    <AuthorizedLayout>
      <AssessmentPage />
    </AuthorizedLayout>
  )
}
