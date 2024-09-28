import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Grid, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import { TrendingUp, TrendingDown, Award, Target, Zap, HelpCircle } from 'lucide-react'
// Import components (assumed to be in separate files)
import StatPanel from './statPanel'
import PieChartAnswer from './pieChartAnswer'
import ScoreRankProgression from './ScoreRankProgression'
import AnswerCorrectnessTime from './AnswerCorrectnessTime'
import ScoreGainedStrikeCount from './ScoreGainedStrikeCount'
import PlayerTablePerformance from './playerTablePerformance'
import { GRAY } from '@/theme/palette'
const PlayerModal = ({ open, handleClose, player, totalPlayers, players }) => {
  const router = useRouter()
  const gameId = router.query.gameId
  const [playerHistory, setPlayerHistory] = useState(null)

  useEffect(() => {
    const fetchPlayerHistory = async () => {
      if (player && gameId) {
        try {
          const response = await api.get(
            `games/game-history/${gameId}/players/${player.playerId}`,
            { authRequired: true }
          )
          const data = response.data
          data.questionsPerformance = data.questionsPerformance.map((item) => {
            let timeSubmitted = item.timeSubmittedInSecond

            // Continue adding 1 until the timeSubmittedInSecond is positive
            while (timeSubmitted < 0) {
              timeSubmitted += 1
            }

            return {
              ...item,
              timeSubmittedInSecond: timeSubmitted, // Update the timeSubmittedInSecond
            }
          })
          setPlayerHistory(data)
        } catch (error) {
          console.error('Error fetching player history:', error)
        }
      }
    }

    fetchPlayerHistory()
  }, [player, gameId])

  if (!player) return null

  const averageScore = players.reduce((acc, p) => acc + p.finalScore, 0) / players.length
  const longestStreak = players.reduce((acc, p) => Math.max(acc, p.longestStrikeCount), 0)

  const pieData = [
    { name: 'Correct', value: player.numberOfCorrectAnswers },
    { name: 'Wrong', value: player.numberOfWrongAnswers },
    { name: 'Unanswered', value: player.numberOfUnansweredQuestions },
  ]

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h4" component="h2">
            {player.nickname}&#39;s Performance
          </Typography>
        </Box>
        <Box sx={contentStyle}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <StatisticsSection
                player={player}
                totalPlayers={totalPlayers}
                averageScore={averageScore}
                longestStreak={longestStreak}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChartAnswer pieData={pieData} />
            </Grid>
          </Grid>
          <ProgressionSection playerHistory={playerHistory} />

          <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Question Performance
            </Typography>
            <PlayerTablePerformance playerHistory={playerHistory} />
          </Paper>
        </Box>
      </Box>
    </Modal>
  )
}

const COLORS = {
  GOLD: '#B8860B', // Dark goldenrod
  GREEN: '#2E8B57', // Sea green
  ORANGE: '#D2691E', // Chocolate
  BLUE: '#4169E1', // Royal blue
}

const StatisticsSection = ({ player, totalPlayers, averageScore, longestStreak }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <StatPanel
        title="Final Rank"
        value={`${player.finalRank} of ${totalPlayers}`}
        icon={<Award size={28} color={COLORS.GOLD} />}
      />
    </Grid>
    <Grid item xs={6}>
      <StatPanel
        title="Final Score"
        value={player.finalScore}
        secondaryValue={`Average: ${averageScore.toFixed(2)}`}
        icon={<Target size={28} color={COLORS.GREEN} />}
      />
    </Grid>
    <Grid item xs={6}>
      <StatPanel
        title="Longest Streak"
        value={player.longestStrikeCount}
        secondaryValue={`Highest in Class: ${longestStreak}`}
        icon={<Zap size={28} color={COLORS.ORANGE} />}
      />
    </Grid>
    <Grid item xs={6}>
      <StatPanel
        title="Total Questions"
        value={
          player.numberOfCorrectAnswers +
          player.numberOfWrongAnswers +
          player.numberOfUnansweredQuestions
        }
        icon={<HelpCircle size={28} color={COLORS.BLUE} />}
      />
    </Grid>
  </Grid>
)

const ProgressionSection = ({ playerHistory }) => (
  <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
    <Typography variant="h6" gutterBottom>
      Score and Rank Progression
    </Typography>
    <ScoreRankProgression playerHistory={playerHistory} />
  </Paper>
)

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

export default PlayerModal
