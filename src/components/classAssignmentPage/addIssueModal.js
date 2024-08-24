import React, { useState } from 'react'
import { Box, Typography, Modal, Backdrop, Fade, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ButtonComponent from '@/components/button/buttonComponent' // Ensure the correct import path

const AddIssueModal = ({ open, handleClose, maxAssignments, onAddIssue }) => {
  const [issueName, setIssueName] = useState('')
  const [description, setDescription] = useState('')
  const [studentCount, setStudentCount] = useState('')
  const [error, setError] = useState('')
  const [issueError, setIssueError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const handleAddIssue = async () => {
    if (issueName.trim() === '') {
      setIssueError('Issue name cannot be blank')
      return
    }
    if (description.trim() === '') {
      setDescriptionError('Description cannot be blank')
      return
    }
    if (studentCount < 1) {
      setError('Student count must be at least 1')
      return
    }

    setIssueError('')
    setDescriptionError('')
    setError('')

    const newIssue = {
      name: issueName,
      description,
      studentCount,
    }

    try {
      await onAddIssue(newIssue) // Call the passed-in onAddIssue function with the new issue data and await its completion
      handleClose() // Only close the modal if the add operation is successful
      setIssueName('')
      setDescription('')
      setStudentCount(2)
    } catch (error) {
      setError('Failed to add the issue.')
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
            width: '90%', // Use percentage for responsive width
            maxWidth: 400, // Set a maximum width
            minWidth: 320, // Set a minimum width for smaller screens
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
            Add a New Issue
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Issue Name"
              variant="outlined"
              fullWidth
              value={issueName}
              onChange={(e) => setIssueName(e.target.value)}
              error={!!issueError}
              helperText={issueError}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!descriptionError}
              helperText={descriptionError}
            />
            <TextField
              label="Student Count"
              variant="outlined"
              fullWidth
              value={studentCount}
              onChange={handleStudentCountChange}
              error={!!error}
              helperText={error}
            />
            <ButtonComponent onClick={handleAddIssue} sx={{ mt: 2 }}>
              Add Issue
            </ButtonComponent>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default AddIssueModal
