import React, { useEffect, useState } from 'react'
import JoinPage from '@/components/joinPage/joinPage'
import Page from '@/components/page'

const Join = () => {
  return (
    <div className="app">
      <Page title="Join" description="Join An Interesting Quiz with Edtech Assistant" />
      <JoinPage />
    </div>
  )
}
export default Join
