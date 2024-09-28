import React from 'react'
import { Typography, Grid, Box, Paper } from '@mui/material'

const NaNDisplay = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#888',
    }}
  >
    NaN
  </Box>
)

export default NaNDisplay
