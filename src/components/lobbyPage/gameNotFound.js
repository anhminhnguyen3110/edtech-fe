import React from 'react'
import { Typography } from '@mui/material'

const GameNotFound = ({ message }) => (
  <Typography variant="h2" color="textSecondary" gutterBottom>
    {message}
  </Typography>
)

export default GameNotFound
