import React, { useState } from 'react'
import { Box, Button, Typography, Grid, useTheme, useMediaQuery } from '@mui/material'
import CountdownTimer from '@/components/countDown/countDownTimer'
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER, BLUE } from '@/theme/palette'
import CustomCheckIcon from '@/components/quizPage/customCheckIcon'
import ThickerClearOutlinedIcon from '@/components/icons/thickerClearOutlinedIcon'
import AutoShrinkText from './autoShrinkText'
const Playing = ({ question, handleEndQuestion, playersAnswered }) => {
  const { choices, questionText, timeLimitInSecond, imageFileUrl, questionType, correctAnswers } =
    question
  const [timeCounter, setTimeCounter] = useState(timeLimitInSecond)
  const isTrueFalse = questionType === 'TRUE_FALSE'
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [buttonText, setButtonText] = useState('Skip')
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const calculateFontSize = (text) => {
    const baseSize = isTrueFalse ? 2.7 : 2.2
    const minSize = 1.3
    const maxLength = 30

    if (text.length > maxLength) {
      const reduction = (text.length - maxLength) / 20
      return Math.max(baseSize - reduction, minSize)
    }
    return baseSize
  }

  const handleSkipOrNext = () => {
    if (buttonText === 'Skip') {
      setShowCorrectAnswer(true)
      setTimeCounter(0)
      setButtonText('Next')
    } else {
      // Logic for "Next" will be handled here later
      handleEndQuestion()
    }
  }

  const handleTimerComplete = () => {
    setShowCorrectAnswer(true)
    setButtonText('Next')
  }

  return (
    <Box
      sx={{
        p: 4,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '100%', mx: 'auto', position: 'relative' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', mb: 10, width: '80%', mx: 'auto' }}
        >
          {questionText}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap', // Allows wrapping items on smaller screens
          }}
        >
          {/* Players Answered - Left */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: { xs: '100%', sm: '20%' }, // Adjust width based on screen size
              mb: { xs: 2, sm: 0 }, // Margin bottom on small screens
            }}
          >
            <Typography
              variant="h3"
              mb={1}
              sx={{
                fontSize: {
                  xs: '2rem', // Smaller font size on extra small screens
                  sm: '2.5rem', // Slightly larger font size on small screens
                  md: '3rem', // Default size for medium screens and up
                },
                textAlign: 'center',
              }}
            >
              {playersAnswered}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                width: { xs: '120px', sm: '150px' }, // Adjust button width based on screen size
                fontSize: { xs: '1rem', sm: '1.2rem' }, // Adjust font size based on screen size
                background: BLUE.main,
                '&:hover': {
                  background: BLUE.dark,
                },
              }}
            >
              Answered
            </Button>
            {(playersAnswered > 0 || showCorrectAnswer) && (
              <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button
                  variant="contained"
                  onClick={handleSkipOrNext}
                  sx={{
                    background: BLUE.main,
                    '&:hover': { background: BLUE.dark },
                    fontSize: '1.1rem',
                  }}
                >
                  {buttonText}
                </Button>
              </Box>
            )}
          </Box>

          {/* Image - Center */}
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' }, // Adjust width based on screen size
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, sm: 0 }, // Margin bottom on small screens
            }}
          >
            {imageFileUrl && (
              <Box
                component="img"
                src={imageFileUrl}
                alt="Question"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: { xs: '30vh', sm: '40vh' }, // Adjust height based on screen size
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>

          {/* Countdown Timer - Right */}
          <Box
            sx={{
              width: { xs: '100%', sm: '20%' }, // Adjust width based on screen size
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on small screens
            }}
          >
            <CountdownTimer
              totalTime={timeCounter}
              onComplete={handleTimerComplete}
              width={smallScreen ? 80 : 120} // Reduce width for small screens
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Grid container spacing={3}>
          {choices.map((choice, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: '15px',
                  height: isTrueFalse ? '12rem' : '8rem',
                  backgroundColor: isTrueFalse
                    ? TRUE_FALSE_ANSWER[index % 2]
                    : BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: isTrueFalse
                      ? TRUE_FALSE_ANSWER[index % 2]
                      : BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                    opacity: 0.9,
                  },
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '10px',
                  lineHeight: 1.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <AutoShrinkText text={choice} />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Playing
