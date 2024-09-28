import React from 'react'
import { TableCell, TableRow, Typography, Box, Button } from '@mui/material'
import DonutChart from './donutChart'

const QuestionRow = ({ question, isMobile, openModal, index }) => {
  // Function to convert question types to more natural labels
  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'MULTIPLE_OPTIONS':
        return 'Multiple Correct Answer'
      case 'MULTIPLE_CHOICE':
        return 'Multiple Choice'
      case 'TRUE_FALSE':
        return 'True/False'
      default:
        return type
    }
  }

  return (
    <TableRow key={question.questionId}>
      <TableCell component="th" scope="row">
        <Typography>{index + 1}</Typography>
      </TableCell>
      {/* Question Text */}
      <TableCell>
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            fontSize: isMobile ? '0.9rem' : '1.2rem', // Reduced font size
            wordBreak: 'break-word',
            maxWidth: isMobile ? '50%' : '80%', // Increased max width
            whiteSpace: 'normal', // Allow multiple lines
          }}
        >
          {question.questionText}
        </Typography>
      </TableCell>

      {/* Question Type */}
      <TableCell align="center">
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            fontSize: isMobile ? '0.85rem' : '1.1rem', // Reduced font size
            color: '#333',
          }}
        >
          {getQuestionTypeLabel(question.questionType)}
        </Typography>
      </TableCell>

      {/* Accuracy Rate */}
      <TableCell align="center">
        <Box display="flex" alignItems="center" justifyContent="center">
          <DonutChart
            correct={question.numberOfCorrectAnswers}
            total={question.totalPlayers}
            type="players"
          />
          <Typography variant="body1" sx={{ ml: 2 }}>
            {`${question.numberOfCorrectAnswers} / ${question.totalPlayers}`}
          </Typography>
        </Box>
      </TableCell>

      {/* Action Button */}
      <TableCell align="center">
        <Button
          variant="outlined"
          onClick={() => openModal(question.questionId)}
          sx={{
            borderColor: '#90caf9',
            borderRadius: '8px',
            padding: '5px 12px',
            width: '7rem',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#90caf9',
            },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
            View
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default QuestionRow
