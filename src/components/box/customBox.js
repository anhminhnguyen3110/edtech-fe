// CustomBox.js
import React from 'react'
import { Box } from '@mui/material'
import { BLUE } from '@/theme/palette'

const CustomBox = ({ children }) => {
  return (
    <Box
      sx={{
        border: `4px solid ${BLUE.main}`,
        padding: '16px',
        paddingLeft: '0',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}
    >
      <Box
        sx={{
          backgroundColor: BLUE.main,
          width: '12px',
          height: '4rem',
          borderRadius: '0 5px 5px 0',
          marginRight: '15px',
        }}
      />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  )
}

export default CustomBox
