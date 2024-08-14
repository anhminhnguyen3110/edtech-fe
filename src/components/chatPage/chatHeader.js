import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material'
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
    <Box
      px={2}
      py={1}
      display="flex"
      alignItems="center"
      width="100%"
      maxWidth="90vw"
      margin="auto"
      padding="0"
      marginLeft={3}
    >
      <IconButton onClick={() => router.push('/assistant')} edge="start">
        <ArrowBackIcon />
      </IconButton>
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        mx={2}
        sx={{ flexShrink: 1 }} // Allow this box to shrink
      >
        {isEditing ? (
          <TextField
            value={editableTopicName}
            onChange={handleTopicNameChange}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            fullWidth
            sx={{ maxWidth: '300px' }}
          />
        ) : (
          <Tooltip title={topicName} enterDelay={500} leaveDelay={200}>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              component="div"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '68vw',
                fontWeight: 'bold',
              }}
            >
              {topicName}
            </Typography>
          </Tooltip>
        )}
        <IconButton
          onClick={isEditing ? handleSaveClick : handleMenuClick}
          edge="end"
          sx={{ ml: 1 }} // Add a small margin to the left for spacing
        >
          {isEditing ? <CheckIcon /> : <MoreVertIcon />}
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleEditClick}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={onDeleteClick}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChatHeader
