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
import { BLUE, GRAY } from '@/theme/palette'

const ChatBox = ({ sendChat }) => {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

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
    console.log('Sending message:', message)
    console.log('Attached file:', file)

    if (file) {
      await sendChat(message, file)
    } else {
      await sendChat(message)
    }
    setFile(null)
    setMessage('')
    setIsLoading(false)
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
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      sx={{ borderRadius: '20px', overflow: 'hidden', padding: '3px' }}
    >
      {file && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: GRAY.light,
              borderRadius: '12px',
              p: 1.5,
              mb: 2,
              maxWidth: 'fit-content',
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
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          placeholder="Type your message here..."
          disabled={isLoading}
          maxRows={5}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px',
            },
            '& .MuiInputBase-inputMultiline': {
              overflowY: 'auto',
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip title="Attach PDF file">
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ borderRadius: '28px' }}
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
            disabled={!message.trim() || isLoading}
            sx={{
              borderRadius: '28px',
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

export default ChatBox
