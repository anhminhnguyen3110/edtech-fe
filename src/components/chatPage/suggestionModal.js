import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const SuggestionModal = ({ open, handleClose, sendSuggestion }) => {
  const [selectedCategory, setSelectedCategory] = useState('Education')
  const [searchTerm, setSearchTerm] = useState('')
  const [prompts, setPrompts] = useState({ Education: [], 'Web Search': [] })

  useEffect(() => {
    const loadPrompts = async () => {
      const response = await fetch('/cambridge_data.json')
      const data = await response.json()

      // Categorize prompts based on the domain field
      const categorizedPrompts = {
        Education: data.filter((item) => item.domain === 'education').map((item) => item.question),
        'web search': data
          .filter((item) => item.domain === 'web search')
          .map((item) => item.question),
      }
      setPrompts(categorizedPrompts)
    }

    loadPrompts()
  }, [])

  const onClose = () => {
    handleClose()
  }

  const handleSendSuggestions = (suggestion) => {
    sendSuggestion(suggestion)
    onClose()
  }

  const filteredPrompts = prompts[selectedCategory].filter((prompt) =>
    prompt.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Explore Chat Features
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {Object.keys(prompts).map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          <List sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt, index) => (
                <ListItem key={index} button onClick={() => handleSendSuggestions(prompt)}>
                  <ListItemText primary={prompt} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No prompts found.
              </Typography>
            )}
          </List>
        </Box>
      </Fade>
    </Modal>
  )
}

export default SuggestionModal
