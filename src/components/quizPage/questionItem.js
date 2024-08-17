import React, { useState } from 'react'
import { Paper, Typography, Box, Grid } from '@mui/material'
import QuestionPreview from './questionPreview' // Import the new component
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER } from '@/theme/palette' // Ensure this import is correct

const QuestionItem = ({ question, selected, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          border: selected ? '2px solid #3f51b5' : '1px solid #ccc',
          p: 2,
          margin: 1.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 200, // Fixed height for all question boxes
          overflow: 'hidden',
        }}
        onClick={() => onSelect(question.id)}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            textAlign: 'center',
            fontSize: {
              xs: '0.75rem', // small size for phone screens
              sm: '0.875rem', // default size
            },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {question.text}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            width: '100%',
            height: '50px',
          }}
        >
          {question.image ? (
            <Box
              component="img"
              src={question.image}
              sx={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </Box>
        <Grid container spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
          {question.answers.map((answer, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
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
                    p: 0.5,
                    textAlign: 'left',
                    fontSize: {
                      xs: '0.75rem', // small size for phone screens
                      sm: '0.875rem', // default size
                    },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    fontWeight: question.correctAnswer.includes(index) ? '1000' : 'normal',
                    width: '100%',
                    maxHeight: question.type === 'TRUE_FALSE' ? '60px' : '40px', // Fixed height for answer boxes
                    lineHeight: question.type === 'TRUE_FALSE' ? '30px' : '20px',
                  }}
                >
                  {answer}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <QuestionPreview
        question={question}
        anchorEl={anchorEl}
        open={open}
        onClose={handlePopoverClose}
      />
    </>
  )
}

export default QuestionItem
