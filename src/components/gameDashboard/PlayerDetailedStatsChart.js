import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import NaNDisplay from './nanDisplay'

const truncateName = (truncateName, length) => {
  if (truncateName.length <= length) return truncateName
  return `${truncateName.substring(0, length)}...`
}

const PlayerDetailedStatsChart = ({ players }) => {
  if (!players || players.length === 0) {
    return <NaNDisplay />
  }

  // Map player data to the expected chart data structure
  const data = players.map((player) => ({
    name: player.nickname,
    correct: player.numberOfCorrectAnswers,
    wrong: player.numberOfWrongAnswers,
    unanswered: player.numberOfUnansweredQuestions,
  }))

  // Adjust the chart height to ensure it renders properly with one player
  const chartHeight = players.length > 1 ? players.length * 30 + 40 : 150 // Minimum height for one player

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name" // Use 'name' key to match the data structure
          interval={0}
          tick={{ fontSize: 12 }}
          tickFormatter={(name) => truncateName(name, 12)}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="correct" stackId="a" fill="#82ca9d" name="Correct Answers" />
        <Bar dataKey="wrong" stackId="a" fill="#ff8042" name="Wrong Answers" />
        <Bar dataKey="unanswered" stackId="a" fill="#7FA1C3" name="Unanswered Questions" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PlayerDetailedStatsChart
