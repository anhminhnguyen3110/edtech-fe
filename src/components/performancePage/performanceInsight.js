import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, CircularProgress, Box, Paper } from '@mui/material'
import { BLUE } from '@/theme/palette' // Assuming BLUE is defined correctly in the theme
import api from '@/lib/api' // Ensure that 'api' is imported correctly

const PerformanceInsight = ({ history }) => {
  const [insightsLoading, setInsightsLoading] = useState(false)
  const [insights, setInsights] = useState(null) // Store the result of the insights
  const [isGenerated, setIsGenerated] = useState(false)
  const handleGenerateInsights = async () => {
    setInsightsLoading(true) // Start loading
    try {
      const response = await api.post(
        `games/game-history/performance/detail/insight`,
        { performanceDetailInsightRequest: history }, // Send the entire playerHistory
        { authRequired: true }
      )
      console.log('Insights:', response.data)
      setInsights(response.data.answer) // Store the insights data
      setIsGenerated(true)
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setInsightsLoading(false) // Stop loading
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Performance Insight
      </Typography>
      {!isGenerated && (
        <Button
          variant="contained"
          sx={{ backgroundColor: BLUE.main, color: '#fff' }} // Use sx prop for custom color
          onClick={handleGenerateInsights}
          disabled={insightsLoading}
        >
          {insightsLoading ? <CircularProgress size={24} /> : 'Generate Insights'}
        </Button>
      )}

      {insights && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{insights}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default PerformanceInsight
