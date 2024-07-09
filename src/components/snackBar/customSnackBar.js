import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const CustomSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
