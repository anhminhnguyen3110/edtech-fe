import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'

const CountdownTimer = ({ totalTime, width = 120 }) => {
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
        value={100}
        size={width}
        thickness={4}
        sx={{
          color: BLUE.dark,
          position: 'absolute',
        }}
      />
      <Typography
        component="div"
        fontWeight="bold"
        sx={{
          fontSize: '14px',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {totalTime}
      </Typography>
    </Box>
  )
}

export default CountdownTimer
