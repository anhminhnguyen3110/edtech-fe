// PerformanceChart.js
import React from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Box, Typography, Tooltip as MuiTooltip } from '@mui/material'
import { formatStartTime } from '@/lib/utils'

const PerformanceBarChart = ({ chartData }) => {
  const barSize = chartData.length < 5 ? 90 : undefined
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const correctAnswersColor = '#A1DD70'
      const incorrectAnswersColor = '#FFA27F'
      const avgResponseTimeColor = '#557C55'

      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {label}: {data.quizName}
          </Typography>
          <Typography variant="body2">{formatStartTime(data.startedAt)}</Typography>
          <Typography variant="body2" color={correctAnswersColor}>
            Correct Answers: {data.percentCorrect?.toFixed(2)}%
          </Typography>
          <Typography variant="body2" color={incorrectAnswersColor}>
            Incorrect Answers: {data.percentIncorrect?.toFixed(2)}%
          </Typography>
        </Box>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          label={{
            value: 'Percentage of Answers (%)',
            angle: -90,
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            dx: 5, // Adjust horizontal position if needed
            dy: 0, // Adjust vertical position to center the label
          }}
          domain={[0, 100]} // Adjust Y-axis to reflect percentage scale
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: 'Time (s)',
            angle: -90,
            position: 'insideRight',
            style: { textAnchor: 'middle' },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="percentCorrect"
          stackId="answers"
          fill="#A1DD70"
          name="Correct Answers (%)"
          barSize={barSize}
        />
        <Bar
          yAxisId="left"
          dataKey="percentIncorrect"
          stackId="answers"
          fill="#fa5252"
          name="Incorrect Answers (%)"
          barSize={barSize}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default PerformanceBarChart
