import React from 'react'
import { Typography, Box } from '@mui/material'

const GameNotFound = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <Typography variant="h2" color="textSecondary" gutterBottom>
      {message}
    </Typography>
  </Box>
)

export default GameNotFound
