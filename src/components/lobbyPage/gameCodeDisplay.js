import React from 'react'
import { Paper, Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'

const GameCodeDisplay = ({ gameCode }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '2rem 17rem',
        marginBottom: '40px',
        background: BLUE.main,
        borderRadius: '20px',
      }}
    >
      <Typography variant="h1" color="white">
        {gameCode || 'Loading...'}
      </Typography>
    </Paper>
  )
}

export default GameCodeDisplay
