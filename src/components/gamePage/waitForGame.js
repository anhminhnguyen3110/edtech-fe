import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'
import { BLUE } from '@/theme/palette'
import CountdownTimer from '@/components/countDown/countDownTimer'

const parseQuestionType = (type) => {
  switch (type) {
    case 'MULTIPLE_CHOICE':
      return 'Multiple Choice'
    case 'TRUE_FALSE':
      return 'True or False'
    case 'MULTIPLE_OPTIONS':
      return 'Multiple Answers'
    default:
      return 'Unknown Question Type'
  }
}

const WaitForGame = ({ question = defaultQuestion, startGetQuestions, moveToQuestion }) => {
  const { choices, questionText, timeLimitInSecond, imageFileUrl, questionType, correctAnswers } =
    question
  const totalTime = 5

  const counter = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter.current === 0) {
        startGetQuestions()
      }
      counter.current += 1

      // Check if 5 seconds have passed
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [startGetQuestions, moveToQuestion])

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
            {questionText}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color={BLUE.main}
            fontWeight="medium"
            sx={{ marginBottom: '30px' }}
          >
            {parseQuestionType(questionType)}
          </Typography>
          <CountdownTimer totalTime={totalTime} onComplete={moveToQuestion} />
        </Paper>
      </Container>
    </Box>
  )
}

export default WaitForGame
