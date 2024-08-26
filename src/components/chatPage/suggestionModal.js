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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BLUE } from '@/theme/palette'
const suggestionData = [
  {
    domain: 'British Council',
    fileUrl: '/data/british_council.json',
  },
  {
    domain: 'Cambridge',
    fileUrl: '/data/cambridge.json',
  },
  {
    domain: 'Daily Writing Tips',
    fileUrl: '/data/sample_daily_writing.json',
  },
  {
    domain: 'Information for schools',
    fileUrl: '/data/school_vic.json',
  },
  {
    domain: 'Biography',
    fileUrl: '/data/spark_note_biography.json',
  },
  {
    domain: 'Biology',
    fileUrl: '/data/spark_note_biology.json',
  },
  {
    domain: 'Chemistry',
    fileUrl: '/data/spark_note_chemistry.json',
  },
  {
    domain: 'Cs',
    fileUrl: '/data/spark_note_cs.json',
  },
  {
    domain: 'Drama',
    fileUrl: '/data/spark_note_drama.json',
  },
  {
    domain: 'Economics',
    fileUrl: '/data/spark_note_economics.json',
  },
  {
    domain: 'Film',
    fileUrl: '/data/spark_note_film.json',
  },
  {
    domain: 'Health',
    fileUrl: '/data/spark_note_health.json',
  },
  {
    domain: 'History',
    fileUrl: '/data/spark_note_history.json',
  },
  {
    domain: 'Literature',
    fileUrl: '/data/spark_note_lit.json',
  },
  {
    domain: 'Math',
    fileUrl: '/data/spark_note_math.json',
  },
  {
    domain: 'Philosophy',
    fileUrl: '/data/spark_note_philosophy.json',
  },
  {
    domain: 'Physics',
    fileUrl: '/data/spark_note_physics.json',
  },
  {
    domain: 'Poetry',
    fileUrl: '/data/spark_note_poetry.json',
  },
  {
    domain: 'Shakespeare',
    fileUrl: '/data/spark_note_shakespeare.json',
  },
  {
    domain: 'Short-stories',
    fileUrl: '/data/spark_note_short-stories.json',
  },
  {
    domain: 'Us-government-and-politics',
    fileUrl: '/data/spark_note_us-government-and-politics.json',
  },
]

const SuggestionModal = ({ open, handleClose, sendSuggestion }) => {
  const [selectedDomain, setSelectedDomain] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCloseChip = () => {
    setSelectedDomain('')
    setPrompts([])
  }

  useEffect(() => {
    if (selectedDomain) {
      const loadPrompts = async () => {
        setLoading(true)
        const selectedFile = suggestionData.find((item) => item.domain === selectedDomain).fileUrl
        const response = await fetch(selectedFile)
        const data = await response.json()
        setPrompts(data)
        setLoading(false)
      }
      loadPrompts()
    }
  }, [selectedDomain])

  const onClose = () => {
    handleClose()
  }

  const handleSendSuggestions = (suggestion, title, url) => {
    sendSuggestion(suggestion, title, url)
    onClose()
  }

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.question.toLowerCase().includes(searchTerm.toLowerCase())
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {selectedDomain ? (
              <Chip label={selectedDomain} color="primary" onDelete={handleCloseChip} />
            ) : (
              <FormControl fullWidth>
                <InputLabel id="domain-select-label">Select Domain</InputLabel>
                <Select
                  labelId="domain-select-label"
                  value={selectedDomain}
                  label="Select Domain"
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Set maximum height for the dropdown
                      },
                    },
                  }}
                >
                  {suggestionData.map(({ domain }) => (
                    <MenuItem key={domain} value={domain}>
                      {domain}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30vh',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <List sx={{ maxHeight: '55vh', overflowY: 'auto' }}>
              {' '}
              {/* Further reduce the list's max height */}
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map(
                  (
                    item,
                    index // Reduce the number of displayed items
                  ) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSendSuggestions(item.question, item.title, item.url)}
                    >
                      <ListItemText
                        primary={item.question}
                        secondary={
                          <span style={{ fontSize: '0.775rem' }}>
                            <span style={{ color: BLUE.main }}>{item.title}</span>
                            <br />
                            <a
                              href={item.url}
                              style={{ color: BLUE.main }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.url}
                            </a>
                          </span>
                        }
                      />
                    </ListItem>
                  )
                )
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No prompts found.
                </Typography>
              )}
            </List>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}

export default SuggestionModal
