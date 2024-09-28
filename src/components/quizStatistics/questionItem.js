/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { Typography, Box, useMediaQuery, useTheme, Collapse, IconButton } from '@mui/material'
import { BLUE } from '@/theme/palette'
import CustomCheckIcon from '@/components/quizPage/customCheckIcon'

const QuestionItem = ({ question }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showLevels, setShowLevels] = useState(false)
  const [boxHeight, setBoxHeight] = useState('4rem')
  const parentRef = useRef(null)

  const handleToggleLevels = () => {
    setShowLevels((prev) => !prev)
  }

  useEffect(() => {
    if (parentRef.current) {
      if (showLevels) {
        const computedStyle = window.getComputedStyle(parentRef.current)
        const paddingTop = parseInt(computedStyle.paddingTop)
        const paddingBottom = parseInt(computedStyle.paddingBottom)
        const totalHeight = parentRef.current.offsetHeight + paddingTop + paddingBottom

        if (question.choices.length > 2) {
          setBoxHeight(`${totalHeight * 1.6}px`)
        } else {
          setBoxHeight(`${totalHeight * 1.1}px`)
        }
      } else {
        setBoxHeight('4rem')
      }
    }
  }, [showLevels, question.choices.length])

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
            {question.questionText}
          </Typography>
        </Box>
        <Collapse in={showLevels} timeout="auto" unmountOnExit>
          <Box mt={2}>
            {question.choices.map((choice, idx) => (
              <Box
                key={idx}
                display="flex"
                alignItems="center"
                p={1}
                mb={1}
                sx={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  justifyContent: 'space-between',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                  height: '3rem', // Ensures the height of each choice is consistent
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '1rem' }}>
                  {choice}
                </Typography>
                {question.correctAnswers.includes(choice) && (
                  <IconButton
                    sx={{
                      width: 30,
                      height: 30,
                      margin: '3px',
                      backgroundColor: 'lightgreen',
                      borderRadius: '50%',
                      border: 'none',
                      '&:hover': {
                        backgroundColor: 'lightgreen',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CustomCheckIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default QuestionItem
