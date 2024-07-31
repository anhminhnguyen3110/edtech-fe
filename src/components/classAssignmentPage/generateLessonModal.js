import React, { useState } from 'react'
import { Box, Typography, Modal, Backdrop, Fade, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ButtonComponent from '@/components/button/buttonComponent' // Ensure the correct import path

const GenerateLessonModal = ({ open, handleClose, generateLesson }) => {
  const [prompt, setPrompt] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const onClose = () => {
    setError('')
    setPrompt('')
    setName('')
    handleClose()
  }

  const handleGenerateLesson = () => {
    if (!prompt || !name) {
      setError('Both fields are required.')
      return
    }
    setError('')
    generateLesson(name, prompt)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
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
            Generate New Lesson
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Prompt"
              value={prompt}
              placeholder="E.g I want to generate a lesson to improve issues of students"
              onChange={(e) => setPrompt(e.target.value)}
              fullWidth
            />
            <TextField
              label="Name"
              value={name}
              placeholder="E.g Lesson 1"
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <ButtonComponent onClick={handleGenerateLesson} sx={{ mt: 2 }}>
              Generate Lesson
            </ButtonComponent>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default GenerateLessonModal
