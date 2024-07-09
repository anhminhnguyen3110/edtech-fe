import React from 'react'
import { Paper, Typography, Grid, Box, Button } from '@mui/material'
import { Add, Check } from '@mui/icons-material'
import { BACKGROUND_ANSWER } from '@/theme/palette' // Ensure this import is correct

const QuestionList = ({ questions, selectedQuestionId, onSelect, onAdd }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom sx={{ mb: '1rem' }}>
      Questions
    </Typography>
    <Grid container spacing={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
      {questions.map((q) => (
        <Grid item xs={12} key={q.id}>
          <Paper
            sx={{
              cursor: 'pointer',
              border: selectedQuestionId === q.id ? '2px solid #3f51b5' : '1px solid #ccc',
              p: 2,
              margin: 1.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 200, // Fixed height for all question boxes
              overflow: 'hidden',
            }}
            onClick={() => onSelect(q.id)}
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
              {q.text}
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
              {q.image ? (
                <Box
                  component="img"
                  src={q.image}
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
              {q.answers.map((answer, index) => (
                <Grid item xs={6} key={index}>
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                        color: 'white',
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 0.5,
                        textAlign: 'center',
                        fontSize: {
                          xs: '0.75rem', // small size for phone screens
                          sm: '0.875rem', // default size
                        },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        fontWeight: 'bold',
                        width: '100%',
                        height: '100%', // Make sure the boxes fill the grid space
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: '32px', // Ensure the box is large enough to store the tick
                      }}
                    >
                      {answer}
                    </Typography>
                    {q.correctAnswer.includes(index) && (
                      <Check
                        sx={{
                          position: 'absolute',
                          right: 4,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          fontSize: '1.1rem',
                          color: 'green',
                          padding: '2px',
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Button variant="outlined" startIcon={<Add />} fullWidth onClick={onAdd} sx={{ mt: 2 }}>
      Add Question
    </Button>
  </Paper>
)

export default QuestionList
