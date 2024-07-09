import React from 'react'
import { Box, Paper, TextField, Button } from '@mui/material'
import { BLUE } from '@/theme/palette'
import CustomTickButton from './customTickButton' // Ensure the correct path is used
import { BACKGROUND_ANSWER } from '@/theme/palette'
const QuestionEditor = ({ question, onUpdate, unsavedChanges, onSave, onDelete }) => {
  const handleQuestionTextChange = (text) => {
    onUpdate({ ...question, text })
  }

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = question.answers.map((a, i) => (i === index ? value : a))
    onUpdate({ ...question, answers: updatedAnswers })
  }

  const handleCorrectAnswerChange = (index) => {
    // onUpdate({ ...question, correctAnswer: index });
    const { correctAnswer } = question
    let updatedCorrectAnswer

    if (question.type === 'MULTIPLE_OPTIONS') {
      if (correctAnswer.includes(index)) {
        updatedCorrectAnswer = correctAnswer.filter((i) => i !== index)
      } else {
        updatedCorrectAnswer = [...correctAnswer, index]
      }
    } else {
      updatedCorrectAnswer = [index]
    }

    onUpdate({ ...question, correctAnswer: updatedCorrectAnswer })
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          value={question.text}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          variant="outlined"
          label="Question Text"
          margin="normal"
          InputProps={{
            style: {
              fontWeight: 'bold',
            },
          }}
        />
        <Box sx={{ width: '48px' }}></Box> {/* Placeholder for alignment */}
      </Box>
      {question.answers.map((answer, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            variant="outlined"
            InputProps={{
              readOnly: question.type === 'TRUE_FALSE',
              style: {
                backgroundColor: BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                color: 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <CustomTickButton
            // selected={index === question.correctAnswer}
            selected={question.correctAnswer.includes(index)}
            onClick={() => handleCorrectAnswerChange(index)}
          />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1, background: BLUE.main, fontSize: '1.1rem' }}
          onClick={onSave}
          disabled={!unsavedChanges}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mr: 1, fontSize: '1.1rem' }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  )
}

export default QuestionEditor
