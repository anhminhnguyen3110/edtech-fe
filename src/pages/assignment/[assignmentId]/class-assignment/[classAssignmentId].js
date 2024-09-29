// pages/quiz/index.js
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import ClassAssignmentDetail from './client'
import Page from '@/components/page'
export default function Assessment() {
  return (
    <>
      <Page title="Class Assignment" description="Class Assignment Page" />
      <AuthorizedLayout>
        <ClassAssignmentDetail />
      </AuthorizedLayout>
    </>
  )
}
