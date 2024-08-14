import React, { useState, useRef } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Grid,
  Tooltip,
  CircularProgress,
} from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
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
      sx={{ borderRadius: '20px', overflow: 'hidden' }}
    >
      {file && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '48px' }}>
            {' '}
            {/* Add marginLeft to align with the input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: GRAY.light,
                borderRadius: '12px',
                p: 1.5,
                maxWidth: '100%',
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
          </Box>
        </Grid>
      )}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0 }}>
          <Tooltip title="Attach PDF file">
            <IconButton
              component="label"
              sx={{
                borderRadius: '50%',
                padding: '6px', // Reduce padding to make it smaller
                background: GRAY.main,
                '&:hover': { backgroundColor: GRAY.dark },
              }}
              disabled={isLoading}
            >
              <AddCircleOutlinedIcon sx={{ color: BLUE.dark, fontSize: '35px' }} />{' '}
              {/* Reduced icon size */}
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </IconButton>
          </Tooltip>
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
                borderRadius: '20px',
                padding: '4px', // Adjust this value to reduce height
              },
              '& .MuiInputBase-inputMultiline': {
                padding: '8px', // Reduce padding to make the field less tall
                overflowY: 'auto',
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            sx={{
              borderRadius: '50%',
              padding: '6px', // Reduce padding to match the other IconButton
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon
                sx={{
                  color: message.trim() && !isLoading ? BLUE.dark : GRAY.darker,
                  fontSize: '32px',
                }}
              />
            )}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ChatBox
