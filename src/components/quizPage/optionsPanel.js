import React from 'react'
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import { Upload, Delete } from '@mui/icons-material'

const OptionsPanel = ({ question, onUpdate }) => {
  const handleQuestionTypeChange = (event) => {
    const type = event.target.value
    let updatedAnswers = [...question.answers]
    let correctAnswer = [...question.correctAnswer]

    if (type === 'TRUE_FALSE') {
      updatedAnswers = ['True', 'False']
    } else if (type === 'MULTIPLE_OPTIONS') {
      if (question.type === 'TRUE_FALSE') {
        updatedAnswers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'] // Expand to more answers as needed
        correctAnswer = []
      } else if (question.type !== 'MULTIPLE_OPTIONS') {
        correctAnswer = []
      }
    } else if (type === 'MULTIPLE_CHOICE') {
      if (question.type === 'TRUE_FALSE') {
        updatedAnswers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
      }
    }
    correctAnswer = [0]

    // Ensure there are at least 4 answers for multiple choice and multiple options
    if (type !== 'TRUE_FALSE' && updatedAnswers.length < 4) {
      updatedAnswers = [...updatedAnswers, '', '', '', ''].slice(0, 4)
    }

    onUpdate({ ...question, type, answers: updatedAnswers, correctAnswer })
  }

  const handleTimingChange = (event) => {
    const timing = event.target.value
    onUpdate({ ...question, timing })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onUpdate({ ...question, image: e.target.result })
      }
      reader.readAsDataURL(file)
      // Reset the file input value
      event.target.value = ''
    }
  }

  const deleteBackgroundImage = () => {
    onUpdate({ ...question, image: null })
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Options
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Timing</InputLabel>
        <Select value={question.timing || ''} onChange={handleTimingChange} label="Timing">
          <MenuItem value="10">10 sec</MenuItem>
          <MenuItem value="20">20 sec</MenuItem>
          <MenuItem value="30">30 sec</MenuItem>
          <MenuItem value="60">60 sec</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Answer type</InputLabel>
        <Select value={question.type} onChange={handleQuestionTypeChange} label="Answer type">
          <MenuItem value="MULTIPLE_CHOICE">Multiple choice</MenuItem>
          <MenuItem value="MULTIPLE_OPTIONS">Multiple answers</MenuItem>
          <MenuItem value="TRUE_FALSE">True/False</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Background Image
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" startIcon={<Upload />} fullWidth>
            Upload
          </Button>
        </label>
        {question.image && (
          <Box sx={{ mt: 2, position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={question.image}
              alt="Background"
              style={{ width: '100%', height: '160px', objectFit: 'contain' }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              onClick={deleteBackgroundImage}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default OptionsPanel
