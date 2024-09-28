import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Paper, IconButton, Button, CircularProgress } from '@mui/material'
import StatPanel from '@/components/gameDashboard/statPanel'
import { Award, Target, Zap, BarChart2, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import PerformanceBarChart from './PerformanceBarChart'
import TrendChart from './TrendChart'
import api from '@/lib/api'
import { useRouter } from 'next/router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PerformanceInsight from './performanceInsight'
import RankPercentileChart from './rankPercentileChart'
import ResponseTimeChart from './responseTImeChart'

const COLORS = {
  GOLD: '#FFD700',
  GREEN: '#4CAF50',
  ORANGE: '#FF9800',
  BLUE: '#2196F3',
  PURPLE: '#9C27B0',
  RED: '#F44336',
}

const ViewPage = () => {
  const [playerHistory, setPlayerHistory] = useState(null)
  const [fetched, setFetched] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState(() => {
    const savedData = localStorage.getItem('selectedStudents')
    return savedData ? JSON.parse(savedData) : {}
  })
  const selectedPlayers = Object.values(selectedStudents)
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/performance')
  }

  useEffect(() => {
    const fetchPlayerHistory = async () => {
      if (selectedPlayers.length > 0) {
        try {
          const playerGameRequest = selectedPlayers.flatMap((player) =>
            player.games.map((game) => ({
              playerNickname: player.player.nickname,
              gameId: game.gameId,
            }))
          )

          const response = await api.post(
            `games/game-history/performance/detail`,
            { playerGameRequest: playerGameRequest },
            { authRequired: true }
          )
          const data = response.data
          setPlayerHistory(data)
        } catch (error) {
          console.error('Error fetching player history:', error)
        } finally {
          setFetched(true)
        }
      }
    }

    if (!fetched && selectedPlayers.length > 0) {
      fetchPlayerHistory()
    }
  }, [selectedPlayers, fetched])

  if (!selectedPlayers.length || !playerHistory) return null

  // Prepare data for the chart
  const chartData = playerHistory
    .map((game) => ({
      name: game.quizName,
      quizName: game.quizName,
      score: game.personalScore,
      highestGameScore: game.highestScoreInGame,
      averageGameScore: game.averageScoreInGame,
      rank: game.finalRank,
      correctAnswers: game.numberOfCorrectAnswers,
      percentCorrect: (game.numberOfCorrectAnswers / game.totalQuestions) * 100,
      percentIncorrect:
        ((game.totalQuestions - game.numberOfCorrectAnswers) / game.totalQuestions) * 100,
      incorrectAnswers: game.totalQuestions - game.numberOfCorrectAnswers,
      avgResponseTime: game.averageResponseTimePerQuestion,
      longestStreak: game.longestStrikeCount,
      startedAt: new Date(game.startedAt),
      totalPlayers: game.totalPlayers,
      rankPercentile: ((game.totalPlayers - game.finalRank + 1) / game.totalPlayers) * 100,
      playerAverageResponseTime: game.averageResponseTimePerQuestion,
      gameAverageResponseTime: game.averageResponseTimePerQuestionInGame,
    }))
    .sort((a, b) => a.startedAt - b.startedAt)
    .map((game, index) => ({
      ...game,
      name: `Game ${index + 1}`,
    }))

  const totalGames = playerHistory.length
  const totalCorrectAnswers = playerHistory.reduce(
    (sum, game) => sum + game.numberOfCorrectAnswers,
    0
  )
  const totalQuestions = playerHistory.reduce((sum, game) => sum + game.totalQuestions, 0)
  const correctAnswerRate = (totalCorrectAnswers / totalQuestions) * 100
  const averagePercentileRanking =
    playerHistory.reduce((sum, game) => {
      const percentile = ((game.totalPlayers - game.finalRank + 1) / game.totalPlayers) * 100
      return sum + percentile
    }, 0) / totalGames

  const StatisticsSection = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <StatPanel
          title="Average Percentile"
          value={`${averagePercentileRanking.toFixed(1)}%`}
          secondaryValue={`Surpassed ${averagePercentileRanking.toFixed(1)}% of other players`}
          icon={<Award size={28} color={COLORS.GOLD} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <StatPanel
          title="Correct Answer Rate"
          value={`${correctAnswerRate.toFixed(1)}%`}
          icon={<BarChart2 size={28} color={COLORS.GREEN} />}
        />
      </Grid>
    </Grid>
  )

  return (
    <Box sx={{ padding: 3 }}>
      <Box>
        <Box sx={headerStyle}>
          <IconButton sx={{ mr: 1 }} onClick={handleBackClick}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h4" component="h2">
            Player&#39;s Performance Overtime Analysis
          </Typography>
        </Box>
        <Box sx={contentStyle}>
          <StatisticsSection />
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid
              item
              xs={12}
              md={chartData.length < 5 ? 6 : 12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper elevation={3} sx={{ p: 2, mt: 3, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Performance Overview
                </Typography>
                <PerformanceBarChart chartData={chartData} />
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={chartData.length < 5 ? 6 : 12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper elevation={3} sx={{ p: 2, mt: 3, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Player Performance Trend
                </Typography>
                <TrendChart chartData={chartData} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper elevation={3} sx={{ p: 2, mt: 3, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Time Response Overview
                </Typography>
                <ResponseTimeChart chartData={chartData} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper elevation={3} sx={{ p: 2, mt: 3, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Player Rank Percentile Overview
                </Typography>
                <RankPercentileChart chartData={chartData} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <PerformanceInsight history={playerHistory} />
      </Box>
    </Box>
  )
}

const headerStyle = {
  display: 'flex',
  p: 2,
  backgroundColor: 'background.paper',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}

const contentStyle = {
  p: 2,
  flexGrow: 1,
}

export default ViewPage
