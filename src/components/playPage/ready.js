import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'
import { BLUE } from '@/theme/palette'

const Ready = ({ timeQuestionStart, moveToAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    // Convert timeQuestionStart to the user's local time
    if (!timeQuestionStart) return
    const targetTime = new Date(timeQuestionStart).getTime()
    const updatedTargetTime = targetTime - 2000

    // Update the time left every 100 milliseconds for higher precision
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const timeRemaining = updatedTargetTime - now

      if (timeRemaining <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
        moveToAnswer() // Trigger the function when time is up
      } else {
        setTimeLeft(timeRemaining)
      }
    }, 100) // Checking every 100 milliseconds for more precision

    // Cleanup the interval on component unmount
    return () => clearInterval(interval)
  }, [timeQuestionStart, moveToAnswer])

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
            Ready to play?
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default Ready
