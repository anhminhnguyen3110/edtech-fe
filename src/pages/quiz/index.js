// pages/quiz/index.js
import SimpleLayout from '../../components/layout/simpleLayout'
import AuthorizedLayout from '@/components/layout/AuthorizedLayout'
import { QuizPage } from './client'
import Page from '@/components/page'
export default function Quiz() {
  return (
    <>
      <Page title="Quiz" description="Quiz page" />
      <AuthorizedLayout>
        <QuizPage />
      </AuthorizedLayout>
    </>
  )
}
