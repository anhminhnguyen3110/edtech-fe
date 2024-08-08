import React from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

const ErrorNotification = ({ onRetry }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        padding: { xs: 1.5, sm: 2 },
        borderRadius: 1,
        textAlign: 'center',
        maxWidth: '100%',
      }}
    >
      <Typography
        variant={isMobile ? 'subtitle1' : 'h6'}
        color="error"
        gutterBottom
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          fontWeight: 'bold',
        }}
      >
        Error Generating Answer
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.5rem' },
          marginBottom: { xs: 1, sm: 2 },
        }}
        gutterBottom
      >
        We encountered an issue while processing your request. Please try again later.
      </Typography>
      <Box display="flex" justifyContent="center" mt={1}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          size={isMobile ? 'small' : 'medium'}
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            padding: { xs: '4px 8px', sm: '6px 16px' },
          }}
        >
          Retry
        </Button>
      </Box>
    </Box>
  )
}

export default ErrorNotification
