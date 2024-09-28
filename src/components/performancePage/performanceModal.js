import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Grid, Paper } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Award, Target, Zap, BarChart2, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import api from '@/lib/api'
import { GRAY } from '@/theme/palette'
import { useSelectedStudents } from './selectedStudentsContext'
import StatPanel from '@/components/gameDashboard/statPanel'
import PerformanceBarChart from './PerformanceBarChart'
import TrendChart from './TrendChart'

const COLORS = {
  GOLD: '#FFD700',
  GREEN: '#4CAF50',
  ORANGE: '#FF9800',
  BLUE: '#2196F3',
  PURPLE: '#9C27B0',
  RED: '#F44336',
}

const PerformanceModal = ({ open, handleClose }) => {
  const [playerHistory, setPlayerHistory] = useState(null)
  const { selectedStudents } = useSelectedStudents()
  const selectedPlayers = Object.values(selectedStudents)
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchPlayerHistory = async () => {
      if (selectedPlayers && selectedPlayers.length > 0) {
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
    if (!fetched) fetchPlayerHistory()
  }, [selectedPlayers, fetched])

  if (!selectedPlayers || !playerHistory) return null

  // Prepare data for the chart
  const chartData = playerHistory
    .map((game) => ({
      name: game.quizName,
      quizName: game.quizName,
      score: game.personalScore,
      rank: game.finalRank,
      correctAnswers: game.numberOfCorrectAnswers,
      incorrectAnswers: game.totalQuestions - game.numberOfCorrectAnswers,
      avgResponseTime: game.averageResponseTimePerQuestion,
      longestStreak: game.longestStrikeCount,
      startedAt: new Date(game.startedAt),
    }))
    .sort((a, b) => a.startedAt - b.startedAt)
    .map((game, index) => ({
      ...game,
      name: `Game ${index + 1}`,
    }))
  console.log('chartData:', chartData)

  // Calculate overall stats
  const totalGames = playerHistory.length
  const averageScore = playerHistory.reduce((sum, game) => sum + game.personalScore, 0) / totalGames
  const highestRank = Math.min(...playerHistory.map((game) => game.finalRank))
  const lowestRank = Math.max(...playerHistory.map((game) => game.finalRank))
  const longestStreak = Math.max(...playerHistory.map((game) => game.longestStrikeCount))

  // Calculate correct answer rate
  const totalCorrectAnswers = playerHistory.reduce(
    (sum, game) => sum + game.numberOfCorrectAnswers,
    0
  )
  const totalQuestions = playerHistory.reduce((sum, game) => sum + game.totalQuestions, 0)
  const correctAnswerRate = (totalCorrectAnswers / totalQuestions) * 100

  // Calculate average percentile ranking
  const averagePercentileRanking =
    playerHistory.reduce((sum, game) => {
      const percentile = ((game.totalPlayers - game.finalRank + 1) / game.totalPlayers) * 100
      return sum + percentile
    }, 0) / totalGames

  const StatisticsSection = () => (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Total Games"
          value={totalGames}
          icon={<TrendingUp size={28} color={COLORS.PURPLE} />}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Highest Rank"
          value={highestRank}
          icon={<ArrowUp size={28} color={COLORS.GREEN} />}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Average Percentile"
          value={`${averagePercentileRanking.toFixed(1)}%`}
          secondaryValue="Top players"
          icon={<Award size={28} color={COLORS.GOLD} />}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Average Score"
          value={averageScore.toFixed(0)}
          icon={<Target size={28} color={COLORS.BLUE} />}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Longest Streak"
          value={longestStreak}
          icon={<Zap size={28} color={COLORS.ORANGE} />}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <StatPanel
          title="Correct Answer Rate"
          value={`${correctAnswerRate.toFixed(1)}%`}
          icon={<BarChart2 size={28} color={COLORS.GREEN} />}
        />
      </Grid>
    </Grid>
  )

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h4" component="h2">
            Player&#39;s Performance Overtime Analysis
          </Typography>
        </Box>
        <Box sx={contentStyle}>
          <StatisticsSection />
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Score and Rank Progression
              </Typography>
              <PerformanceBarChart chartData={chartData} />
            </Paper>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Score, Rank, and Streak Trends
              </Typography>
              <TrendChart chartData={chartData} />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

const modalStyle = {
  position: 'absolute',
  border: 'None',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '80vw',
  minWidth: '500px',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  maxHeight: '95vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
}

const headerStyle = {
  p: 2,
  backgroundColor: 'background.paper',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}

const contentStyle = {
  p: 2,
  flexGrow: 1,
}

export default PerformanceModal
