import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import NaNDisplay from './nanDisplay'
// Function to truncate text with ellipsis
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

// Function to wrap long text
const wrapText = (text, maxWidth) => {
  const words = text.split(' ')
  let lines = []
  let currentLine = ''

  words.forEach((word) => {
    if (currentLine.length + word.length <= maxWidth) {
      currentLine += (currentLine ? ' ' : '') + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  })
  lines.push(currentLine)
  return lines
}

// Custom X Axis tick with conditional text truncation
const CustomXAxisTick = ({ x, y, payload, shouldTruncate }) => {
  const truncatedLabel = shouldTruncate ? truncateText(payload.value, 20) : payload.value
  const lines = wrapText(truncatedLabel, 25) // Adjust 25 to change the wrap width
  return (
    <g transform={`translate(${x},${y})`} cursor="pointer">
      <title>{payload.value}</title> {/* Tooltip to show full text */}
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
        {lines}
      </text>
    </g>
  )
}

const QuestionPerformanceChart = ({ questionStats, totalPlayers }) => {
  if (!questionStats || questionStats.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Question Performance
        </Typography>
        <NaNDisplay />
      </Paper>
    )
  }
  // Determine if we need to truncate the text based on the number of questions
  const shouldTruncate = questionStats.length > 2
  const barSize = questionStats.length < 5 ? 90 : undefined

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Question Performance
      </Typography>
      <Box sx={{ overflowX: 'auto', maxWidth: '95vw', overflowY: 'hidden' }}>
        <Box sx={{ minWidth: '800px' }}>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={questionStats} margin={{ top: 20, right: 10, left: 10, bottom: 100 }}>
              <XAxis
                dataKey="questionText"
                interval={0}
                tick={<CustomXAxisTick shouldTruncate={shouldTruncate} />}
                height={15}
              />
              <YAxis domain={[0, totalPlayers]} /> {/* Set the max Y-axis to totalPlayers */}
              <Tooltip />
              <Legend wrapperStyle={{ transform: 'translate(0, 60px)' }} />
              <Bar
                dataKey="correct"
                stackId="a"
                fill="#A1DD70"
                name="Correct Answers"
                barSize={barSize}
              />
              <Bar
                dataKey="incorrect"
                stackId="a"
                fill="#fa5252"
                name="Incorrect Answers"
                barSize={barSize}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  )
}

export default QuestionPerformanceChart
