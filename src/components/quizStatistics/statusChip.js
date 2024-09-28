import React from 'react'
import { Chip } from '@mui/material'

// Define colors for each status
const statusColors = {
  success: 'green',
  error: 'red',
  default: 'gray',
}

const StatusChip = ({ text, status }) => {
  // Determine the color based on the status
  const textColor = statusColors[status] || statusColors.default

  return (
    <Chip
      label={text}
      style={{
        backgroundColor: 'white',
        color: textColor,
        border: `1px solid ${textColor}`,
      }}
    />
  )
}

export default StatusChip
