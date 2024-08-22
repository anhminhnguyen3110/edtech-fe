import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'
import Page from '@/components/page'
import Wait from '@/components/waitPage/wait'
const WaitPage = () => {
  return (
    <>
      <Page title="Wait" description="Wait for the game to start" />
      <Wait />
    </>
  )
}

export default WaitPage
