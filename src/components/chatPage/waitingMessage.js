import React from 'react'
import { Box, Avatar, useTheme, useMediaQuery } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import { GRAY } from '@/theme/palette'
import { keyframes } from '@mui/system'

const waveAnimation = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`

const Dot = ({ delay }) => {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: GRAY.darker,
        margin: '0 4px',
        animation: `${waveAnimation} 1.3s infinite ease-in-out`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

const AnimatedEllipsis = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </Box>
  )
}

const WaitingMessage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
      {!isMobile && (
        <Avatar
          sx={{
            bgcolor: GRAY.main,
            width: '2.5rem',
            height: '2.5rem',
            mr: 1,
          }}
        >
          <SchoolIcon />
        </Avatar>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        maxWidth={isMobile ? '100%' : '70%'}
      >
        <Box
          maxWidth="100%"
          width="fit-content"
          bgcolor="#e2e3e5"
          borderRadius="10px"
          p={2} // Reduced padding
          minWidth="60px" // Ensure minimum width for proper centering
          minHeight="40px" // Ensure minimum height for proper centering
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedEllipsis />
        </Box>
      </Box>
    </Box>
  )
}

export default WaitingMessage
