import React, { useEffect } from 'react'
import { Snackbar, Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { green, red } from '@mui/material/colors'

const NotificationSnackbar = ({ open, message, type, onClose }) => {
  // Function to get the current date and time
  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toLocaleString()
  }

  useEffect(() => {
    console.log('NotificationSnackbar open:', open)
  }, [open, message, type])

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000} // Increased auto-hide duration
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ transform: 'translateY(50px)', zIndex: 1400, maxWidth: 600 }} // Removed incorrect bottom positioning
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: '8px',
          border: `3px solid ${type === 'success' ? green[500] : red[500]}`,
          p: 2,
          boxShadow: 1,
        }}
      >
        {type === 'success' ? (
          <CheckCircleIcon sx={{ color: green[500], mr: 2, fontSize: 40 }} />
        ) : (
          <ErrorIcon sx={{ color: red[500], mr: 2, fontSize: 40 }} />
        )}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
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
