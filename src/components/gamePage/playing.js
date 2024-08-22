import React, { useState } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import CountdownTimer from '@/components/countDown/countDownTimer'
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER, BLUE } from '@/theme/palette'
import CustomCheckIcon from '@/components/quizPage/customCheckIcon'
import ThickerClearOutlinedIcon from '@/components/icons/thickerClearOutlinedIcon'

const Playing = ({ question, handleEndQuestion, playersAnswered }) => {
  const { choices, questionText, timeLimitInSecond, imageFileUrl, questionType, correctAnswers } =
    question
  const [timeCounter, setTimeCounter] = useState(timeLimitInSecond)
  const isTrueFalse = questionType === 'TRUE_FALSE'
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [buttonText, setButtonText] = useState('Skip')

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
          }}
        >
          {/* Players Answered - Left */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '20%',
            }}
          >
            <Typography variant="h3" mb={1}>
              {playersAnswered}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                width: '150px',
                fontSize: '1.2rem',
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
          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
            {imageFileUrl && (
              <Box
                component="img"
                src={imageFileUrl}
                alt="Question"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '40vh',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>

          {/* Countdown Timer - Right */}
          <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
            <CountdownTimer totalTime={timeCounter} onComplete={handleTimerComplete} />
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
                <Typography
                  sx={{
                    fontSize: `${calculateFontSize(choice)}rem`,
                    '@media (max-width: 600px)': {
                      fontSize: `${Math.max(calculateFontSize(choice) - 0.3, 1.5)}rem`,
                    },
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {showCorrectAnswer ? (
                    correctAnswers.includes(choice) ? (
                      <CustomCheckIcon sx={{ fontSize: '4rem' }} />
                    ) : (
                      <ThickerClearOutlinedIcon sx={{ fontSize: '4rem' }} />
                    )
                  ) : (
                    choice
                  )}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Playing
