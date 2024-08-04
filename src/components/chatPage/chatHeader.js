import React, { useState } from 'react'
import { Box, Typography, IconButton, TextField, Menu, MenuItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'

const ChatHeader = ({ topicName, onSaveClick, onDeleteClick }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editableTopicName, setEditableTopicName] = useState(topicName)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleEditClick = () => {
    setIsEditing(true)
    handleCloseMenu()
  }

  const handleSaveClick = () => {
    onSaveClick(editableTopicName)
    setIsEditing(false)
  }

  const handleTopicNameChange = (e) => {
    setEditableTopicName(e.target.value)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
      <IconButton onClick={() => router.push('/assistant')}>
        <ArrowBackIcon />
      </IconButton>
      <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
        {isEditing ? (
          <TextField
            value={editableTopicName}
            onChange={handleTopicNameChange}
            variant="outlined"
            size="small"
            style={{ width: '300px' }}
          />
        ) : (
          <Typography variant="h4" component="div">
            {topicName}
          </Typography>
        )}
        {isEditing ? (
          <IconButton onClick={handleSaveClick} sx={{ ml: 1 }}>
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleMenuClick}
            sx={{
              ml: 1,
              padding: '8px',
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleEditClick}>
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={onDeleteClick}>
            <DeleteIcon sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </Box>
      <Box width={40} /> {/* This box acts as a placeholder for alignment */}
    </Box>
  )
}

export default ChatHeader
