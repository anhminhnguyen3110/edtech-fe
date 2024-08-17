import React from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'
import { BLUE } from '@/theme/palette'
import CountdownTimer from '@/components/countDown/countDownTimer'

const Ready = ({ quiz, handleStart }) => {
  const totalTime = 3
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      bgcolor={BLUE.main}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color={BLUE.darker}
            fontWeight="bold"
          >
            {quiz.name}
          </Typography>
          <Typography variant="h4" align="center" gutterBottom color={BLUE.dark}>
            {quiz.questions.length} questions
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color={BLUE.main}
            fontWeight="medium"
            sx={{ marginBottom: '30px' }}
          >
            Are you ready?
          </Typography>
          <CountdownTimer totalTime={totalTime} onComplete={handleStart} />
        </Paper>
      </Container>
    </Box>
  )
}

export default Ready
