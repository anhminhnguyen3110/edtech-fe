import React from 'react'
import { Box } from '@mui/material'

const ScrollableBox = ({ children, maxHeight = '500px' }) => {
  return (
    <Box
      sx={{
        maxHeight,
        overflowY: 'auto',
        mt: 2,
        p: 6, // Padding of 6 units
        border: '1px solid', // Solid border
        borderColor: 'gray', // Gray border color
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow
        backgroundColor: 'white', // Ensure background color is white
      }}
    >
      {children}
    </Box>
  )
}

export default ScrollableBox
