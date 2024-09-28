import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Box, Typography, Paper } from '@mui/material'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const PieChartAnswer = ({ pieData, height = 120, radius = 60 }) => {
  const total = pieData.reduce((sum, entry) => sum + entry.value, 0)

  return (
    <Paper sx={{ borderRadius: 8 }}>
      <Box sx={{ p: 2, height: '100%', boxShadow: 5, borderRadius: 8 }}>
        <Typography variant="h6" gutterBottom>
          Answer Summary
        </Typography>
        <Box sx={{ height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={radius}
                innerRadius={radius * 0.6}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2 }}>
          {pieData.map((entry, index) => (
            <Box
              key={entry.name}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: COLORS[index % COLORS.length],
                    mr: 1,
                  }}
                />
                <Typography variant="body2">{entry.name}</Typography>
              </Box>
              <Typography variant="body2">{((entry.value / total) * 100).toFixed(1)}%</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default PieChartAnswer
