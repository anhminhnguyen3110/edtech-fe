import React from 'react'
import { Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material'

const StatPanel = ({ title, value, icon, secondaryValue, note }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h8" color="text.secondary">
        {note}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        {secondaryValue && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {secondaryValue}
          </Typography>
        )}
      </Box>
      {!isMobile && <Box sx={{ position: 'absolute', bottom: 24, right: 16 }}>{icon}</Box>}
    </Paper>
  )
}

export default StatPanel
