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
  Tooltip,
} from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EditIcon from '@mui/icons-material/Edit'
import ButtonComponent from '../button/buttonComponent'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import AddchartIcon from '@mui/icons-material/Addchart'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import { BLUE } from '@/theme/palette'

const QuizItem = ({ quiz }) => {
  const theme = useTheme()
  const isAllowedHost = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onEditClick = () => {
    router.push(`/quiz/${quiz.id}`)
  }

  const onPreviewClick = () => {
    router.push(`/quiz/statistics/${quiz.id}`)
  }

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
      const gameId = response.data.id
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="8px"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box
          display="flex"
          alignItems="center"
          flex="1"
          maxWidth="80%"
          minWidth="0"
          justifyContent={isMobile ? 'center' : 'flex-start'}
        >
          <RocketLaunchIcon
            sx={{
              marginRight: '16px',
              fontSize: isMobile ? '1.2rem' : '2.6rem',
              fontWeight: 'bold',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                wordBreak: 'break-word',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              {quiz.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: isMobile ? '0.8rem' : '1rem',
                color: BLUE.main,
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              {quiz.totalQuestions} questions
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexShrink="0"
          justifyContent={isMobile ? 'center' : 'flex-end'}
          mt={isMobile ? '16px' : '0'}
        >
          <Tooltip title="Edit">
            <IconButton onClick={onEditClick}>
              <EditIcon sx={{ fontSize: isMobile ? '1.2rem' : '2rem', fontWeight: 'bold' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Statistics">
            <IconButton onClick={onPreviewClick} sx={{ marginRight: '1rem' }}>
              <AddchartIcon sx={{ fontSize: isMobile ? '1.2rem' : '2rem', fontWeight: 'bold' }} />
            </IconButton>
          </Tooltip>
          {!isAllowedHost && (
            <ButtonComponent
              onClick={handleHostLive}
              variant="contained"
              sx={{ marginLeft: '16px', maxWidth: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={24} color="inherit" sx={{ marginRight: '8px' }} />
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
          )}
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
