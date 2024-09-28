import React from 'react'
import { Typography } from '@mui/material'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatStartTime } from '@/lib/utils'
import { BLUE } from '@/theme/palette'
// Define a new cold color palette
const COLORS = {
  highestScore: '#4DD0E1', // Light Blue
  playerScore: BLUE.main, // Indigo
  averageScore: '#81C784', // Light Green
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#F5F5F5',
          padding: '10px',
          border: '1px solid #E0E0E0',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ margin: '0 0 5px', fontWeight: 'bold', color: '#333' }}>
          {label}: {payload[0].payload.quizName}
        </p>
        <Typography variant="body2" style={{ marginBottom: '5px', color: '#555' }}>
          {formatStartTime(payload[0].payload.startedAt)}
        </Typography>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const TrendChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis dataKey="name" tick={{ fill: '#333' }} />
        <YAxis yAxisId="left" tick={{ fill: '#333' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar
          yAxisId="left"
          dataKey="highestGameScore"
          fill={COLORS.highestScore}
          name="Highest Game Score"
        />
        <Bar
          yAxisId="left"
          dataKey="score"
          fill={COLORS.playerScore}
          name="Player's Score"
          stroke="#3F51B5"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="left"
          dataKey="averageGameScore"
          fill={COLORS.averageScore}
          name="Average Game Score"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TrendChart
