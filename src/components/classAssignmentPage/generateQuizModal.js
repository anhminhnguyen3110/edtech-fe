import React, { useState } from 'react'
import { Box, Typography, Modal, Backdrop, Fade, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ButtonComponent from '@/components/button/buttonComponent' // Ensure the correct import path

const GenerateQuizModal = ({ open, handleClose, generateQuiz }) => {
  const [prompt, setPrompt] = useState('')
  const [numberOfMultipleChoiceQuestions, setNumberOfMultipleChoiceQuestions] = useState(0)
  const [numberOfTrueFalseQuestions, setNumberOfTrueFalseQuestions] = useState(0)
  const [numberOfMultipleAnswerQuestions, setNumberOfMultipleAnswerQuestions] = useState(0)
  const [error, setError] = useState('')

  const handleGenerateQuiz = () => {
    if (prompt.trim() === '') {
      setError('Prompt cannot be blank')
      return
    }
    const totalQuestions =
      numberOfMultipleChoiceQuestions + numberOfTrueFalseQuestions + numberOfMultipleAnswerQuestions
    if (totalQuestions <= 0) {
      setError('Total number of questions must be greater than 0')
      return
    }
    if (totalQuestions > 50) {
      setError('Total number of questions must be 50 or less')
      return
    }

    setError('')

    const newQuiz = {
      prompt,
      numberOfMultipleChoiceQuestions,
      numberOfTrueFalseQuestions,
      numberOfMultipleAnswerQuestions,
    }

    try {
      // Call the function to generate the quiz with the newQuiz data
      console.log(newQuiz)
      generateQuiz(
        prompt,
        numberOfMultipleChoiceQuestions,
        numberOfTrueFalseQuestions,
        numberOfMultipleAnswerQuestions
      )
      handleClose() // Only close the modal if the operation is successful
      setPrompt('')
      setNumberOfMultipleChoiceQuestions(0)
      setNumberOfTrueFalseQuestions(0)
      setNumberOfMultipleAnswerQuestions(0)
    } catch (error) {
      setError('Failed to generate the quiz.')
    }
  }

  const onClose = () => {
    setError('')
    setPrompt('')
    setNumberOfMultipleChoiceQuestions(0)
    setNumberOfTrueFalseQuestions(0)
    setNumberOfMultipleAnswerQuestions(0)
    handleClose()
  }

  const handleNumberOfQuestionsChange = (setter) => (e) => {
    const value = Number(e.target.value)
    if (value >= 0) {
      setter(value)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: 'blur(1px)' }, // Blurs the background
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Generate New Quiz
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Prompt"
              value={prompt}
              placeholder="E.g I want to generate a quiz to improve issues of students"
              onChange={(e) => setPrompt(e.target.value)}
              fullWidth
            />
            <TextField
              label="Multiple Choice Questions"
              type="number"
              value={numberOfMultipleChoiceQuestions}
              onChange={handleNumberOfQuestionsChange(setNumberOfMultipleChoiceQuestions)}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="True/False Questions"
              type="number"
              value={numberOfTrueFalseQuestions}
              onChange={handleNumberOfQuestionsChange(setNumberOfTrueFalseQuestions)}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="Multiple Answer Questions"
              type="number"
              value={numberOfMultipleAnswerQuestions}
              onChange={handleNumberOfQuestionsChange(setNumberOfMultipleAnswerQuestions)}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <ButtonComponent onClick={handleGenerateQuiz} sx={{ mt: 2 }}>
              Generate Quiz
            </ButtonComponent>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default GenerateQuizModal
