import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Grid, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Zap,
  HelpCircle,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import StatPanel from './statPanel'
import PieChartAnswer from './pieChartAnswer'
import BarChartAnswerDistribution from './BarChartAnswerDistribution' // Import new component
import QuestionTablePerformance from './questionTablePerformance'
const QuestionModal = ({ open, handleClose, question }) => {
  const router = useRouter()
  const gameId = router.query.gameId
  const [questionHistory, setQuestionHistory] = useState(null)
  const [averageTime, setAverageTime] = useState(null)
  const [answerDistribution, setAnswerDistribution] = useState([])

  useEffect(() => {
    const fetchQuestionHistory = async () => {
      if (question && gameId) {
        try {
          const response = await api.get(
            `games/game-history/${gameId}/questions/${question.questionId}`,
            { authRequired: true }
          )
          const data = response.data
          data.players = data.players.map((item) => {
            let timeSubmitted = item.timeSubmittedInSecond
            while (timeSubmitted < 0) {
              timeSubmitted += 1
            }
            return { ...item, timeSubmittedInSecond: timeSubmitted }
          })
          setQuestionHistory(data)
          setAverageTime(
            data.players.reduce((acc, p) => acc + p.timeSubmittedInSecond, 0) / data.players.length
          )

          // Calculate answer distribution
          const distribution = calculateAnswerDistribution(
            data.players,
            data.choices,
            data.correctAnswer
          )
          setAnswerDistribution(distribution)
        } catch (error) {
          console.error('Error fetching player history:', error)
        }
      }
    }
    fetchQuestionHistory()
  }, [question, gameId])

  const calculateAnswerDistribution = (players, choices, correctAnswer) => {
    const distribution = choices.map((choice) => ({
      answer: choice,
      count: players.filter((p) => p.playerAnswer?.includes(choice)).length,
      isCorrect: correctAnswer.includes(choice),
    }))
    console.log(distribution)
    return distribution
  }

  if (!question || !questionHistory) return null

  // Pie chart data for correct, wrong, and unanswered questions
  const pieData = [
    { name: 'Correct', value: questionHistory.numberOfCorrectAnswers },
    { name: 'Wrong', value: questionHistory.numberOfWrongAnswers },
    { name: 'Unanswered', value: questionHistory.numberOfUnansweredQuestions },
  ]

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h4" component="h2">
            {question.questionText}
          </Typography>
        </Box>
        <Box sx={contentStyle}>
          <Grid container spacing={3}>
            {/* Stat Panel for first row */}
            <Grid item xs={12}>
              <StatisticsSection question={questionHistory} averageTime={averageTime} />
            </Grid>

            {/* Two charts side by side in second row */}
            <Grid item xs={12} md={6}>
              <PieChartAnswer pieData={pieData} height={200} radius={85} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChartAnswerDistribution answerDistribution={answerDistribution} />{' '}
              {/* Use the new component */}
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 8 }}>
                <Typography variant="h6" gutterBottom>
                  Player Performance
                </Typography>
                <QuestionTablePerformance questionHistory={questionHistory} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}

const StatisticsSection = ({ question, averageTime }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <StatPanel
        title="Average Response Time"
        value={`${averageTime?.toFixed(2)}s`}
        icon={<Zap size={24} color="#D2691E" />}
      />
    </Grid>
    <Grid item xs={6}>
      <StatPanel
        title="Number of Correct Answers"
        value={`${question.numberOfCorrectAnswers} of ${question.players.length} players`}
        icon={<Target size={24} color="#2E8B57" />}
      />
    </Grid>
  </Grid>
)

const modalStyle = {
  position: 'absolute',
  border: 'None',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '80vw',
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
  top: 0,
  zIndex: 1,
}

const contentStyle = {
  p: 2,
  flexGrow: 1,
}

export default QuestionModal
