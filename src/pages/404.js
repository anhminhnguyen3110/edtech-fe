import React from 'react'
import NotFound from '@/components/notFound/notFound'
import Page from '@/components/page'
const NotFoundPage = () => {
  return (
    <>
      <Page title="404" description="Page not found" />
      <NotFound />
    </>
  )
}
export default NotFoundPage
