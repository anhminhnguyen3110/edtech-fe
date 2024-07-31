import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EditIcon from '@mui/icons-material/Edit'
import ButtonComponent from '../button/buttonComponent'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'
import api from '@/lib/api'

const QuizItem = ({ quiz }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const router = useRouter()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onEditClick = () => {
    router.push(`/quiz/${quiz.id}`)
  }

  // Function to truncate the quiz name if it exceeds 15 characters
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const handleHostLive = async () => {
    setLoading(true)
    try {
      const response = await api.post('/games', { quizId: quiz.id }, { authRequired: true })
      const gameCode = response.data.gameCode
      const gameId = response.data.id // Assuming 'id' is the key for the gameId in the response
      router.push(`/lobby?gameCode=${gameCode}&gameId=${gameId}`)
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to host live game'
      setSnackbarMessage(errorMessage)
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" alignItems="center" flex="1" minWidth="0">
          <RocketLaunchIcon
            style={{
              marginRight: '16px',
              fontSize: isMobile ? '1.2rem' : '2rem',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: '1',
              minWidth: '0',
            }}
          >
            {isMobile ? truncateText(quiz.name, 12) : quiz.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexShrink="0">
          <IconButton onClick={onEditClick}>
            <EditIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 'bold' }} />
          </IconButton>
          <ButtonComponent
            onClick={handleHostLive}
            variant="contained"
            style={{ marginLeft: '16px' }}
            disabled={loading}
          >
            {loading ? (
              <Box display="flex" alignItems="center">
                <CircularProgress size={24} color="inherit" style={{ marginRight: '8px' }} />
                <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
                  Creating Game
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
                Host Live
              </Typography>
            )}
          </ButtonComponent>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ bottom: '400px', zIndex: 1400 }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </CustomBox>
  )
}

export default QuizItem
