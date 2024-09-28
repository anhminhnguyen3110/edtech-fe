import React from 'react'
import { Typography } from '@mui/material'
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatStartTime } from '@/lib/utils' // Make sure to include the formatStartTime utility
import { BLUE } from '@/theme/palette' // Assuming BLUE is already defined in your palette

// Custom Tooltip component for displaying additional data
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <Typography variant="subtitle2">
          <strong>
            {label}: {payload[0].payload.quizName}
          </strong>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatStartTime(payload[0].payload.startedAt)}
        </Typography>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

// RankPercentileChart component using Recharts
const RankPercentileChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone" // This makes the line smooth
          yAxisId="left"
          dataKey="rankPercentile"
          stroke={BLUE.main}
          strokeWidth={3} // Thicker line
          name="Rank Percentile"
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default RankPercentileChart
