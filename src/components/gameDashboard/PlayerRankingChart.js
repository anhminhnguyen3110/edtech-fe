import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from 'recharts'
import NaNDisplay from './nanDisplay'
import { BLUE } from '@/theme/palette'

const truncateName = (truncateName, length) => {
  if (truncateName.length <= length) return truncateName
  return `${truncateName.substring(0, length)}...`
}

const PlayerRankingChart = ({ players }) => {
  if (!players || players.length === 0) {
    return <NaNDisplay />
  }
  const sortedPlayers = [...players].sort((a, b) => b.finalScore - a.finalScore)
  // Adjust the chart height to ensure it renders properly with one player
  const chartHeight =
    players.length === 1
      ? 150
      : players.length >= 2 && players.length <= 5
      ? players.length * 60 + 120
      : players.length * 30 + 40

  return (
    <ResponsiveContainer width="95%" height={chartHeight}>
      <BarChart layout="vertical" data={sortedPlayers} margin={{ top: 5, right: 60, bottom: 5 }}>
        {' '}
        {/* Increased right margin */}
        <Legend verticalAlign="top" height={36} />
        <XAxis type="number" />
        <YAxis
          dataKey="nickname"
          type="category"
          width={90}
          tick={{ fontSize: 12 }}
          tickFormatter={(name) => truncateName(name, 12)}
        />
        <Tooltip />
        <Bar dataKey="finalScore" fill={BLUE.main} name="Final Score">
          <LabelList dataKey="finalScore" position="right" offset={10} /> {/* Adjusted position */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PlayerRankingChart
