import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const CircularProgressWithLabel = ({ value }) => {
  const numericValue = parseFloat(value)
  const roundedValue = numericValue === 100 ? '100%' : `${numericValue.toFixed(1)}%`

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={numericValue} size={45} thickness={3} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {roundedValue}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
