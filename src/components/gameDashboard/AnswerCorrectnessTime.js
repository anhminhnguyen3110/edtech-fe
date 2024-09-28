import React from 'react'
import {
  Legend,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
} from 'recharts'
import { Box, Typography, Paper } from '@mui/material'
import NaNDisplay from './nanDisplay'

const AnswerCorrectnessTime = ({ playerHistory }) => {
  if (!playerHistory) {
    return <NaNDisplay />
  }

  const data = playerHistory.questionsPerformance.map((question) => ({
    questionId: question.questionId,
    isCorrect: question.isCorrect ? 1 : 0,
    timeSubmittedInSecond: question.timeSubmittedInSecond,
    questionText: question.questionText,
  }))
  console.log(data)
  // Format the time to be more readable
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
  }

  // Custom Tooltip with consistent color usage
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const questionData = playerHistory.questionsPerformance.find(
        (item) => item.questionId === label
      )
      return (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#555' }}>
              {`Question ${questionData.questionId}: ${questionData.questionText}`}
            </Typography>
            <Typography variant="body2" sx={{ color: '#00C49F' }}>
              {`Answer Correctness: ${payload[0].value ? 'Correct' : 'Incorrect'}`}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8884d8' }}>
              {`Time Submitted: ${
                payload[1]?.value !== undefined ? `${payload[1].value.toFixed(2)}s` : 'No Data'
              }`}
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
        <YAxis yAxisId="left" label={{ value: 'Time (s)', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 1]} hide />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} layout="horizontal" />
        {/* Set default fill color for the Bar */}
        <Bar
          yAxisId="right"
          dataKey="isCorrect"
          name="Answer Correctness"
          maxBarSize={20}
          fill="#00C49F"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.isCorrect ? '#00C49F' : '#FF8042'} />
          ))}
        </Bar>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="timeSubmittedInSecond"
          stroke="#8884d8"
          name="Time Submitted (s)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default AnswerCorrectnessTime
