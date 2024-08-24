import React, { useState } from 'react'
import { Box, Typography, Modal, Backdrop, Fade, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import ButtonComponent from '@/components/button/buttonComponent' // Ensure the correct import path

const GenerateQuizModal = ({ open, handleClose, generateQuiz }) => {
  const [numberOfMultipleChoiceQuestions, setNumberOfMultipleChoiceQuestions] = useState(0)
  const [numberOfTrueFalseQuestions, setNumberOfTrueFalseQuestions] = useState(0)
  const [numberOfMultipleAnswerQuestions, setNumberOfMultipleAnswerQuestions] = useState(0)
  const [error, setError] = useState('')

  const onClose = () => {
    setError('')
    setNumberOfMultipleChoiceQuestions(0)
    setNumberOfTrueFalseQuestions(0)
    setNumberOfMultipleAnswerQuestions(0)
    handleClose()
  }

  const handleGenerateQuiz = () => {
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

    try {
      generateQuiz(
        'create quiz to mitigate student issue',
        numberOfMultipleChoiceQuestions,
        numberOfTrueFalseQuestions,
        numberOfMultipleAnswerQuestions
      )
      onClose()
    } catch (error) {
      setError('Failed to generate the quiz.')
    }
  }

  const handleStudentCountChange = (e) => {
    const number = Number(e.target.value)
    // Allow empty strings to let the user delete and retype
    if (
      e.target.value !== '' &&
      (isNaN(number) || !Number.isInteger(number) || number <= 0 || number > maxAssignments)
    ) {
      setError(
        `Please enter a valid student count. It should be a positive number between 1 and ${maxAssignments}.`
      )
      return // Stop further execution if the value is invalid
    }
    setError('') // Clear the error if the value is valid
    setStudentCount(number)
  }

  const handleNumberOfQuestionsChange = (setter) => (e) => {
    const number = Number(e.target.value)
    // Allow empty strings to let the user delete and retype
    if (e.target.value !== '' && (isNaN(number) || !Number.isInteger(number) || number <= 0)) {
      setError(`Please enter a valid student count. It should be a positive number.`)
      return // Stop further execution if the value is invalid
    }
    setError('') // Clear the error if the value is valid

    if (number >= 0) {
      setter(number)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: 'blur(3px)' },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Use percentage for responsive width
            maxWidth: 600, // Set a maximum width
            minWidth: 320, // Set a minimum width for smaller screens
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Generate New Quiz
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                Customize your quiz to address student issues!
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Multiple Choice"
                value={numberOfMultipleChoiceQuestions}
                onChange={handleNumberOfQuestionsChange(setNumberOfMultipleChoiceQuestions)}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="True/False"
                value={numberOfTrueFalseQuestions}
                onChange={handleNumberOfQuestionsChange(setNumberOfTrueFalseQuestions)}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Multiple Answer"
                value={numberOfMultipleAnswerQuestions}
                onChange={handleNumberOfQuestionsChange(setNumberOfMultipleAnswerQuestions)}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <ButtonComponent
              onClick={handleGenerateQuiz}
              startIcon={<AddIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '8px',
              }}
            >
              Generate Quiz
            </ButtonComponent>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default GenerateQuizModal
