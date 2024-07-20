// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import ClassAssignmentDetail from './client'
export default function Assessment() {
  return (
    <AuthorizedLayout>
      <ClassAssignmentDetail />
    </AuthorizedLayout>
  )
}
