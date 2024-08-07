import React from 'react'
import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
}))

export default StyledPaper
