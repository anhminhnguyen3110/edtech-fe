import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'

const DynamicGreeting = () => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours()
      let newGreeting

      if (currentHour < 12) {
        newGreeting = 'Good Morning'
      } else if (currentHour < 18) {
        newGreeting = 'Good Afternoon'
      } else {
        newGreeting = 'Good Evening'
      }

      setGreeting(newGreeting)
    }

    updateGreeting()
    const intervalId = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 'bold', color: BLUE.main }}>
      {greeting}!
    </Typography>
  )
}

export default DynamicGreeting
