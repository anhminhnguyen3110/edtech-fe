import React from 'react'
import { Typography, Grid, Box, Paper } from '@mui/material'
import { TrendingUp, Users, Timer, TrendingDown } from 'lucide-react'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StatPanel from './statPanel'
import QuestionPerformanceChart from './QuestionPerformanceChart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  LabelList,
  Legend,
  Scatter,
} from 'recharts'
import NaNDisplay from './nanDisplay'
import PlayerRankingChart from './PlayerRankingChart'
import PlayerDetailedStatsChart from './PlayerDetailedStatsChart'

const QuizSummary = ({ gameData }) => {
  const { totalPlayers, players, questions, game } = gameData
  console.log(gameData)
  // Calculate average score
  const averageScore = players.reduce((sum, player) => sum + player.finalScore, 0) / totalPlayers

  // Calculate the correct and incorrect answers for each question
  const questionStats = questions.map((q) => ({
    questionId: q.questionId,
    questionText: q.questionText,
    correct: q.numberOfCorrectAnswers,
    incorrect: q.totalPlayers - q.numberOfCorrectAnswers,
  }))

  // Calculate overall correct answer rate
  const totalCorrectAnswers = players.reduce(
    (sum, player) => sum + player.numberOfCorrectAnswers,
    0
  )
  const totalQuestions = questions.length * totalPlayers
  const overallCorrectRate = (totalCorrectAnswers / totalQuestions) * 100

  // Calculate game duration in minutes
  const gameDuration = (new Date(game.endedAt) - new Date(game.startedAt)) / (1000 * 60)

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatPanel
            title="Total Players"
            value={totalPlayers}
            icon={<Users size={24} color="#1976d2" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatPanel
            title="Average Score"
            value={averageScore.toFixed(0)}
            icon={<SportsScoreIcon size={24} sx={{ color: '#4caf50', fontSize: '2rem' }} />}
            trend={averageScore > 1000 ? 'up' : 'down'}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatPanel
            title="Correct Answer Rate"
            value={`${overallCorrectRate.toFixed(1)}%`}
            icon={
              overallCorrectRate > 80 ? (
                <TrendingUp size={24} color={'#4caf50'} />
              ) : (
                <TrendingDown size={24} color={'#f44336'} />
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatPanel
            title="Game Duration"
            value={`${gameDuration.toFixed(1)} min`}
            icon={<Timer size={24} color="#C37B89" />}
          />
        </Grid>
        <Grid item xs={12}>
          <QuestionPerformanceChart questionStats={questionStats} totalPlayers={totalPlayers} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Final Rankings
            </Typography>
            <PlayerRankingChart players={players} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Player Performance
            </Typography>
            <PlayerDetailedStatsChart players={players} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuizSummary
