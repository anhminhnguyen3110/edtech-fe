/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER, BLUE } from '@/theme/palette'

const SimpleBarChart = ({ choices, questionStatistics, maxCount }) => {
  const containerRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(0)
  console.log(choices)
  console.log(questionStatistics)
  console.log(maxCount)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
    }
  }, [containerRef.current])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        maxWidth: '500px',
        width: '100%',
        height: '100%', // The container takes the full available height
        paddingBottom: '10px', // Add some padding at the bottom for labels
      }}
    >
      {choices.map((choice, index) => {
        const count = questionStatistics.answerCounts[choice] || 0
        let barHeight = 0
        if (count === 0) {
          barHeight = containerHeight * 0.07
        } else {
          barHeight = (count / maxCount) * containerHeight // Calculate height in pixels
        }

        // Determine which color palette to use
        const backgroundColor =
          choices.length === 2
            ? TRUE_FALSE_ANSWER[index % TRUE_FALSE_ANSWER.length]
            : BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length]

        return (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              width: '60px', // Fixed width for each bar
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: backgroundColor,
                width: '100%',
                height: `${barHeight}px`, // Apply height in pixels
                borderRadius: '5px',
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {count}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default SimpleBarChart
