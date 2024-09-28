import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  Cell,
} from 'recharts'
import { Box, Typography, Paper } from '@mui/material'
import NaNDisplay from './nanDisplay'

const LineChartPerformance = ({ playerHistory }) => {
  if (!playerHistory)
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performance Over Time
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 8 }}>
          <NaNDisplay />
        </Paper>
      </Box>
    )
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Performance Over Time
      </Typography>
      <Paper sx={{ p: 2, borderRadius: 8 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={playerHistory.questionsPerformance}
            margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="questionText"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 10 }}
            />
            <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  console.log(data)
                  return (
                    <div
                      style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}
                    >
                      <p>{`Question: ${data.questionText}`}</p>
                      <p>{`Score: ${data.currentScore}`}</p>
                      <p>{`Answer: ${data.isCorrect ? 'Correct' : 'Incorrect'}`}</p>
                      <p>{`Time Submitted: ${data.timeSubmittedInSecond?.toFixed(2)}s`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line type="stepAfter" dataKey="currentScore" stroke="#8884d8" name="Score" />
            <Scatter name="Answer" dataKey="currentScore">
              {playerHistory.questionsPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isCorrect ? 'green' : 'red'} />
              ))}
            </Scatter>
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  )
}

export default LineChartPerformance
