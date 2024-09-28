import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { Paper, Typography } from '@mui/material'
import NanDisplay from './nanDisplay'

const truncateAnswer = (answer, length) => {
  if (answer.length <= length) return answer
  return `${answer.substring(0, length)}...`
}

const BarChartAnswerDistribution = ({ answerDistribution }) => {
  if (!answerDistribution) return <NanDisplay />

  const legendPayload = [
    { value: 'Correct', type: 'square', color: '#4caf50' },
    { value: 'Incorrect', type: 'square', color: '#f44336' },
  ]

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 8 }}>
      <Typography variant="h6" gutterBottom>
        Answer Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={answerDistribution} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="answer" tickFormatter={(answer) => truncateAnswer(answer, 10)} />
          <YAxis />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { answer, count, isCorrect } = payload[0].payload
                return (
                  <div
                    style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}
                  >
                    <p>
                      <strong>
                        {answer} - {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                      </strong>
                    </p>
                    <p>Chosen by: {count} players</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend
            payload={legendPayload}
            layout="horizontal"
            align="center"
            verticalAlign="top"
            wrapperStyle={{ top: -10, left: 0 }}
          />
          <Bar dataKey="count" margin={{ top: 20 }}>
            {answerDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isCorrect ? '#4caf50' : '#f44336'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export default BarChartAnswerDistribution
