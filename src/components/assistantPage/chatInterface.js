import React, { useState, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import AssistantAvatar from './asssistantAvatar'
import { BLUE, GRAY } from '@/theme/palette'
import SchoolIcon from '@mui/icons-material/School'

const ChatInterface = ({ createChat }) => {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file.')
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSend = async () => {
    if (!message.trim()) return
    setIsLoading(true)
    // Simulate API call

    console.log('Sending message:', message)
    console.log('Attached file:', file)
    setMessage('')
    setFile(null)
    await createChat(message, file)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item>
        <AssistantAvatar>
          <SchoolIcon sx={{ fontSize: '1.7rem' }} />
        </AssistantAvatar>
      </Grid>
      <Grid item xs>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
          How can Edtech Assistant assist you today?
        </Typography>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          placeholder="Chat with Edtech Assistant..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 2, borderRadius: '10px' }}
        />
        {file && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: GRAY.light,
              borderRadius: '8px',
              p: 1.5,
              mb: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: GRAY.homePage,
              },
            }}
          >
            <InsertDriveFileIcon sx={{ color: BLUE.main, mr: 1 }} />
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file.name}
            </Typography>
            <Tooltip title="Remove file">
              <IconButton size="small" onClick={handleRemoveFile}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip title="Attach PDF file">
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ borderRadius: 28 }}
              disabled={isLoading}
            >
              Attach file
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            onClick={handleSend}
            disabled={(!message.trim() && !file) || isLoading}
            sx={{
              borderRadius: 28,
              background: BLUE.main,
              '&:hover': { backgroundColor: BLUE.dark },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ChatInterface
