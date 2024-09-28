import React from 'react'
import { Tooltip, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const DonutChart = ({ correct, total, type }) => {
  const calculatePercentage = (correct, total) => (total > 0 ? (correct / total) * 100 : 0)

  const percentage = calculatePercentage(correct, total)
  const incorrect = total - correct
  const data = [
    { name: 'Correct', value: percentage },
    { name: 'Incorrect', value: 100 - percentage },
  ]
  const COLORS = ['#A1DD70', '#FA7070']

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="body2">{`Correct: ${correct} ${type}`}</Typography>
          <Typography variant="body2">{`Incorrect: ${incorrect} ${type}`}</Typography>
        </Box>
      }
      arrow
    >
      <Box sx={{ width: 80, height: 80, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Typography
          variant="caption"
          component="div"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-40%, -50%)',
            textAlign: 'center',
          }}
        >
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default DonutChart
