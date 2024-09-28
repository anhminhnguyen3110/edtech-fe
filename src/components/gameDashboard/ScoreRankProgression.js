import React from 'react'
import {
  Legend,
  Line,
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
  if (!playerHistory) {
    return <NaNDisplay />
  }

  const updatedData = playerHistory.questionsPerformance.map((item, index) => ({
    ...item,
    questionNumber: `Q${index + 1}`,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const questionIndex = parseInt(label.replace('Q', ''), 10) - 1
      const questionData = playerHistory.questionsPerformance[questionIndex]
      if (questionData) {
        return (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {`Question ${questionIndex + 1}: ${questionData.questionText}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ color: '#8884d8' }}>
                {`Current Score: ${payload[0].value}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ color: '#82ca9d' }}>
                {`Current Rank: ${payload[1].value}`}
              </Typography>
            </Box>
          </Paper>
        )
      }
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      {' '}
      {/* Increased height for better spacing */}
      <ComposedChart data={updatedData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
        {' '}
        {/* Added margins */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="questionNumber"
          label={{ value: 'Questions', position: 'insideBottom', offset: -25 }}
          tickMargin={15}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          yAxisId="left"
          label={{ value: 'Score', angle: -90, position: 'insideLeft', offset: -5 }}
          tick={{ fontSize: 12 }}
          tickMargin={15}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Rank', angle: 90, position: 'insideRight', offset: 5 }}
          domain={[Math.max(...playerHistory.questionsPerformance.map((d) => d.currentRank)), 1]}
          tick={{ fontSize: 12 }}
          tickMargin={15}
          reversed
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} layout="horizontal" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="currentScore"
          stroke="#8884d8"
          name="Current Score"
          strokeWidth={3}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="currentRank"
          stroke="#82ca9d"
          name="Current Rank"
          strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ScoreRankProgression
