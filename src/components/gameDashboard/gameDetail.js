/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton, Link, CircularProgress, Tabs, Tab } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import api from '@/lib/api'
import { useRouter } from 'next/router'
import MessageBox from '@/components/box/messageBox'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import { formatStartTime } from '@/lib/utils'
import StatusChip from '@/components/quizStatistics/statusChip'
import QuizSummary from './quizSummary'
import PlayerDashboard from './playerDashboard'
import QuestionDashboard from './questionDashboard'
import { BLUE } from '@/theme/palette'

const GameDetail = () => {
  const [quizName, setQuizName] = useState('Quiz Dashboard')
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [snackbarNotifOpen, setSnackbarNotifOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const router = useRouter()
  const { gameId } = router.query

  const handleTabChange = (event, newValue) => setSelectedTab(newValue)

  const fetchQuizQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(`/games/game-history/${gameId}`, { authRequired: true })
      setGame(response.data)
      setQuizName(response.data.game.quizName)
    } catch (err) {
      const message = err.response?.data?.message || 'Error while fetching quiz data.'
      setError(message)
      setSnackbarNotifOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (gameId) {
      fetchQuizQuestions()
    }
  }, [gameId])

  const handleCloseNotifSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbarNotifOpen(false)
  }

  if (loading && !game) {
    return (
      <Box sx={{ padding: '3rem' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ padding: '3rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton sx={{ mr: 2 }}>
            <Link
              href={`/quiz/statistics/${router.query.id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ArrowBackIosIcon />
            </Link>
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Game Dashboard
          </Typography>
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <MessageBox type="error" message={error || 'No Quiz found'} />
        </Box>
        <NotificationSnackbar
          open={snackbarNotifOpen}
          onClose={handleCloseNotifSnackbar}
          type="error"
          message={error}
        />
      </Box>
    )
  }

  const { gameCode, gameStatus, quizName: gameQuizName, startedAt } = game?.game || {}
  const players = game?.players
  const questions = game?.questions

  return (
    <Box sx={{ padding: '3rem' }}>
      <Box sx={{ padding: '0.2rem', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton sx={{ mr: 2 }}>
            <Link
              href={`/quiz/statistics/${router.query.id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ArrowBackIosIcon />
            </Link>
          </IconButton>
          {game ? (
            <Box display="flex" flexDirection="column" sx={{ ml: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {gameQuizName || quizName}
              </Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', mt: 1 }}>
                <StatusChip
                  status={gameStatus === 'COMPLETED' ? 'success' : 'error'}
                  text={gameStatus === 'COMPLETED' ? 'Finished' : 'Interrupted'}
                  sx={{ maxWidth: 'auto', width: 'fit-content' }}
                />
              </Box>
              <Typography variant="body1" sx={{ color: 'gray', mt: 1, fontSize: '1.5rem' }}>
                Game Code: {gameCode}
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', mt: 0.5, fontSize: '1.2rem' }}>
                Start Time: {formatStartTime(startedAt)}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h4">{quizName}</Typography>
          )}
        </Box>
      </Box>

      {/* Tabs Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ marginBottom: '1rem' }}
        TabIndicatorProps={{ style: { backgroundColor: BLUE.dark, height: '4px' } }}
      >
        <Tab
          label="Summary"
          sx={{ textTransform: 'none', fontWeight: selectedTab === 0 ? 'bold' : 'normal' }}
        />
        <Tab
          label={`Players (${players?.length || 0})`}
          sx={{ textTransform: 'none', fontWeight: selectedTab === 1 ? 'bold' : 'normal' }}
        />
        <Tab
          label={`Questions (${questions?.length || 0})`}
          sx={{ textTransform: 'none', fontWeight: selectedTab === 2 ? 'bold' : 'normal' }}
        />
      </Tabs>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <Box sx={{ margin: '10px' }}>{game && <QuizSummary gameData={game} />}</Box>
      )}
      {selectedTab === 1 && (
        <Box sx={{ margin: '10px' }}>{game && <PlayerDashboard players={game.players} />}</Box>
      )}
      {selectedTab === 2 && (
        <Box sx={{ margin: '10px' }}>
          {game && <QuestionDashboard questions={game.questions} />}
        </Box>
      )}

      <NotificationSnackbar
        open={snackbarNotifOpen}
        onClose={handleCloseNotifSnackbar}
        type="error"
        message={error}
      />
    </Box>
  )
}

export default GameDetail
