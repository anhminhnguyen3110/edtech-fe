import React, { useState, useRef, useEffect } from 'react'
import { Typography, Box, useMediaQuery, useTheme, Collapse } from '@mui/material'
import { BLUE } from '@/theme/palette'

const RubricItem = ({ rubric }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showLevels, setShowLevels] = useState(false)
  const [boxHeight, setBoxHeight] = useState('4rem')
  const parentRef = useRef(null)

  const handleToggleLevels = () => {
    setShowLevels((prev) => !prev)
  }

  useEffect(() => {
    console.log('clicked')
    if (parentRef.current) {
      if (showLevels) {
        const computedStyle = window.getComputedStyle(parentRef.current)
        const paddingTop = parseInt(computedStyle.paddingTop)
        const paddingBottom = parseInt(computedStyle.paddingBottom)
        const totalHeight = parentRef.current.offsetHeight + paddingTop + paddingBottom
        console.log(totalHeight)
        setBoxHeight(`${totalHeight * 1.6}px`)
      } else {
        console.log('default')
        setBoxHeight('4rem')
      }
    }
  }, [showLevels])

  return (
    <Box
      ref={parentRef}
      onClick={handleToggleLevels}
      sx={{
        border: `4px solid ${BLUE.main}`,
        padding: '16px',
        paddingLeft: '0',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          backgroundColor: BLUE.main,
          width: '12px',
          height: boxHeight,
          borderRadius: '0 5px 5px 0',
          marginRight: '15px',
          transition: 'height 0.3s ease',
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{ fontWeight: '500', fontSize: isMobile ? '1.1rem' : '1.5rem' }}
          >
            {rubric.description}
          </Typography>
        </Box>
        <Collapse in={showLevels} timeout="auto" unmountOnExit>
          <Box mt={2}>
            {rubric.criteriaLevels.map((level) => (
              <Box
                key={level.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                mb={1}
                sx={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {level.name}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {level.score} marks
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default RubricItem
