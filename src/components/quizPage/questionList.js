import React from 'react'
import { Paper, Typography, Grid, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import QuestionItem from './questionItem'

const QuestionList = ({ questions, selectedQuestionId, onSelect, onAdd }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom sx={{ mb: '1rem' }}>
      Questions
    </Typography>
    <Grid container spacing={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
      {questions.map((q) => (
        <Grid item xs={12} key={q.id}>
          <QuestionItem question={q} selected={selectedQuestionId === q.id} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
    <Button variant="outlined" startIcon={<Add />} fullWidth onClick={onAdd} sx={{ mt: 2 }}>
      Add Question
    </Button>
  </Paper>
)

export default QuestionList
