import React from 'react'
import {
  Legend,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
} from 'recharts'
import { Box, Typography, Paper } from '@mui/material'
import NaNDisplay from './nanDisplay'

const ScoreRankProgression = ({ playerHistory }) => {
  if (!playerHistory || !playerHistory.questionsPerformance) {
    return <NaNDisplay />
  }

  const data = playerHistory.questionsPerformance.map((question) => ({
    questionId: question.questionId,
    scoresGained: question.scoresGained,
    currentStrikeCount: question.currentStrikeCount,
    questionText: question.questionText,
  }))

  // Custom Tooltip with consistent color usage and handling undefined data
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const questionData = playerHistory.questionsPerformance.find(
        (item) => item.questionId === label
      )
      return (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {`Question ${questionData?.questionId}: ${questionData?.questionText}`}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8884d8' }}>
              {`Score Gained: ${payload[0]?.value !== undefined ? payload[0].value : 'No Data'}`}
            </Typography>
            <Typography variant="body2" sx={{ color: '#82ca9d' }}>
              {`Strike Count: ${payload[1]?.value !== undefined ? payload[1].value : 'No Data'}`}
            </Typography>
          </Box>
        </Paper>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="questionId"
          label={{ value: 'Question ID', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          yAxisId="left"
          label={{ value: 'Scores Gained', angle: -90, position: 'insideLeft' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Strike Count', angle: 90, position: 'insideRight' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} layout="horizontal" />
        <Bar yAxisId="left" dataKey="scoresGained" fill="#8884d8" name="Scores Gained" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="currentStrikeCount"
          stroke="#ff7300"
          name="Strike Count"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ScoreRankProgression
