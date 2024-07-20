import React from 'react'
import { Box, Typography } from '@mui/material'
import { GRAY } from '@/theme/palette' // Ensure the correct path is used

const MessageBox = ({
  message = 'No assignments available.',
  bgcolor = GRAY.light,
  textColor = 'textSecondary',
  fontSize = '1.4rem',
  ...props
}) => (
  <Box
    textAlign="center"
    p="24px"
    bgcolor={bgcolor}
    borderRadius="8px"
    marginBottom="32px"
    {...props}
  >
    <Typography variant="body1" color={textColor} sx={{ fontSize }}>
      {message}
    </Typography>
  </Box>
)

export default MessageBox
