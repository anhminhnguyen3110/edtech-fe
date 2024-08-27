import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'

const CountdownStop = ({ totalTime, onComplete, width = 120, stopCountdown }) => {
  const [countdown, setCountdown] = useState(totalTime)
  const [isComplete, setIsComplete] = useState(false)
  const [isStopped, setIsStopped] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !isStopped) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!isComplete && !isStopped) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }
  }, [countdown, onComplete, isComplete, isStopped])

  // Function to stop the countdown
  const handleStopCountdown = () => {
    setIsStopped(true)
  }

  // Provide stopCountdown function to parent if it exists
  useEffect(() => {
    if (stopCountdown) {
      stopCountdown(handleStopCountdown)
    }
  }, [stopCountdown])

  // Calculate font size based on width
  const fontSize = width * 0.4 // Adjust the multiplier as needed

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      mb={2}
      position="relative"
      width={width}
      height={width}
      margin="auto"
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={width}
        thickness={4}
        sx={{
          color: GRAY.dark,
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={(countdown / totalTime) * 100}
        size={width}
        thickness={4}
        sx={{
          color: BLUE.dark,
          position: 'absolute',
        }}
      />
      <Typography
        variant="h2"
        component="div"
        fontWeight="bold"
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${fontSize}px`, // Set dynamic font size
        }}
      >
        {countdown}
      </Typography>
    </Box>
  )
}

export default CountdownStop
