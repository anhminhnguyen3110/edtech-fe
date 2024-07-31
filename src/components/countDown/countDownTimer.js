import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'

const CountdownTimer = ({ totalTime, onComplete }) => {
  const [countdown, setCountdown] = useState(totalTime)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      if (onComplete) onComplete()
    }
  }, [countdown, onComplete])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      mb={2}
      position="relative"
      width="120px"
      height="120px"
      margin="auto"
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={120}
        thickness={4}
        sx={{
          color: GRAY.dark,
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={(countdown / totalTime) * 100}
        size={120}
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
        }}
      >
        {countdown}
      </Typography>
    </Box>
  )
}

export default CountdownTimer
