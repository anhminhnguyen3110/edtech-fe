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
import { formatStartTime } from '@/lib/utils'

// Define colors for better contrast
const PLAYER_COLOR = '#2196F3' // A vivid blue
const GAME_COLOR = '#FF5722' // A vivid orange

// CustomTooltip component remains the same
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
            {entry.name}: {entry.value.toFixed(2)} seconds
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Updated ResponseTimeChart component
const ResponseTimeChart = ({ chartData }) => {
  // Calculate the minimum and maximum values for the y-axis
  const allTimes = chartData.flatMap((data) => [
    data.playerAverageResponseTime,
    data.gameAverageResponseTime,
  ])
  const minTime = Math.floor(Math.min(...allTimes))
  const maxTime = Math.ceil(Math.max(...allTimes))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis
          yAxisId="left"
          domain={[minTime, maxTime]}
          padding={{ top: 20, bottom: 20 }}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          label={{ value: 'Response Time (seconds)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        {/* Line for Player's Average Response Time */}
        <Line
          type="monotone"
          yAxisId="left"
          dataKey="playerAverageResponseTime"
          stroke={PLAYER_COLOR}
          strokeWidth={3}
          name="Player Average Response Time"
          dot={{ r: 4 }}
        />
        {/* Line for Game's Average Response Time */}
        <Line
          type="monotone"
          yAxisId="left"
          dataKey="gameAverageResponseTime"
          stroke={GAME_COLOR}
          strokeWidth={3}
          name="Game Average Response Time"
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ResponseTimeChart
