import React, { useEffect } from 'react'
import { Snackbar, Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info' // Import InfoIcon for the info type
import { green, red, blue } from '@mui/material/colors' // Import blue from the palette
import { BLUE } from '@/theme/palette'

const NotificationSnackbar = ({ open, message, type, onClose }) => {
  // Function to get the current date and time
  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toLocaleString()
  }
  useEffect(() => {
    console.log('NotificationSnackbar open:', open)
  }, [open, message, type])

  // Determine the icon and color based on the type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: green[500], mr: 2, fontSize: 40 }} />
      case 'error':
        return <ErrorIcon sx={{ color: red[500], mr: 2, fontSize: 40 }} />
      case 'info':
        return <InfoIcon sx={{ color: BLUE.main, mr: 2, fontSize: 40 }} />
      default:
        return null
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return green[500]
      case 'error':
        return red[500]
      case 'info':
        return BLUE.dark
      default:
        return 'transparent'
    }
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ transform: 'translateY(50px)', zIndex: 1400, maxWidth: 600 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: '8px',
          border: `3px solid ${getBorderColor()}`,
          p: 2,
          boxShadow: 1,
        }}
      >
        {getIcon()}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            {message}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getCurrentDateTime()}
          </Typography>
        </Box>
      </Box>
    </Snackbar>
  )
}

export default NotificationSnackbar
