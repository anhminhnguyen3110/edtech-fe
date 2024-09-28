// PieChart.js
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const PlayerPieChart = ({ player }) => {
  const data = [
    { name: 'Correct', value: player.numberOfCorrectAnswers },
    { name: 'Unanswered', value: player.numberOfUnansweredQuestions },
    { name: 'Wrong', value: player.numberOfWrongAnswers },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(2),
  }))

  const customizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataWithPercentage}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={customizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {dataWithPercentage.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [`${props.payload.percentage}%`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PlayerPieChart
