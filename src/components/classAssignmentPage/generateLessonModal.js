import React, { useState } from 'react'
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import ButtonComponent from '@/components/button/buttonComponent' // Ensure the correct import path

const promptSuggestions = [
  'Improve student issues',
  'Improve critical thinking skills',
  'Introduce computer programming',
  'Teach essay writing techniques',
]

const GenerateLessonModal = ({ open, handleClose, generateLesson }) => {
  const prompt = 'genereate a lesson to improve student issues'
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const onClose = () => {
    setError('')
    setName('')
    handleClose()
  }

  const handleGenerateLesson = () => {
    if (!name) {
      setError('Lesson name is required.')
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
            Generate New Lesson
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                Name your lesson to help improve your student issues!
              </Typography>
            </Box>
            <TextField
              label="Lesson Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              placeholder="E.g., Student Issues Resolution 101"
              variant="outlined"
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <ButtonComponent
              onClick={handleGenerateLesson}
              startIcon={<AddIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '8px',
              }}
            >
              Generate Lesson
            </ButtonComponent>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default GenerateLessonModal
