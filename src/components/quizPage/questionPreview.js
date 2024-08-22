import React from 'react'
import { Paper, Typography, Box, Grid, Popover, Button } from '@mui/material'
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER, BLUE } from '@/theme/palette'
import CountdownTimer from './countDownCircle'

const QuestionPreview = ({ question, anchorEl, open, onClose }) => {
  const popoverWidth = 450
  const popoverHeight = 300
  console.log(question)

  return (
    <Popover
      sx={{ pointerEvents: 'none' }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      onClose={onClose}
      disableRestoreFocus
    >
      <Paper
        sx={{
          p: 2,
          width: `${popoverWidth}px`,
          height: `${popoverHeight}px`,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Question section - 55% of height */}
          <Box
            sx={{
              height: question.type === 'TRUE_FALSE' ? '65%' : '55%',
              display: 'flex',
              flexDirection: 'column',
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                mb: 1,
              }}
            >
              {question.text}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              {/* Answer Number Component */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" mb={0.5}>
                  0
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    width: 'auto',
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    background: BLUE.main,
                    '&:hover': {
                      background: BLUE.dark,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '10px' }}>Answered</Typography>
                </Button>
              </Box>

              {/* Image Component */}
              {question.image && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    component="img"
                    src={question.image}
                    sx={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      mx: 2, // Added margin to separate from other components
                    }}
                  />
                </Box>
              )}

              {/* Countdown Timer Component */}
              <Box>
                <CountdownTimer totalTime={question.timing} width={35} />
              </Box>
            </Box>
          </Box>

          {/* Answers section - 45% of height */}
          <Grid
            container
            spacing={1}
            sx={{ flexGrow: 1, height: question.type === 'TRUE_FALSE' ? '35%' : '45%' }}
          >
            {question.answers.map((answer, index) => (
              <Grid
                item
                xs={6}
                key={index}
                sx={{ height: question.type === 'TRUE_FALSE' ? '70%' : '50%' }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor:
                      question.type === 'TRUE_FALSE'
                        ? TRUE_FALSE_ANSWER[index % 2]
                        : BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                    color: 'white',
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    p: 1,
                    textAlign: 'left',
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    fontWeight: question.correctAnswer.includes(index) ? 'bold' : 'normal',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {answer}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Popover>
  )
}

export default QuestionPreview
