import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, useMediaQuery, useTheme } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const LessonItem = ({ lesson, isEditing, onEditLesson, onDeleteLesson }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isNameEditable, setIsNameEditable] = useState(false)
  const [lessonName, setLessonName] = useState(lesson.name)

  useEffect(() => {
    if (!isEditing) {
      setIsNameEditable(false)
    }
  }, [isEditing])

  const handleEditClick = () => {
    setIsNameEditable(true)
  }

  const handleNameChange = (event) => {
    setLessonName(event.target.value)
  }

  const handleSaveClick = () => {
    setIsNameEditable(false)
    onEditLesson({ ...lesson, name: lessonName })
  }

  const handleDeleteClick = () => {
    onDeleteLesson(lesson.id)
  }

  const handleDownloadClick = () => {
    const link = document.createElement('a')
    link.href = lesson.fileUrl
    link.download = lesson.fileUrl.split('/').pop()
    link.click()
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Box
      sx={{
        backgroundColor: '#B3E5FC',
        padding: isMobile ? '15px' : '30px',
        borderRadius: '10px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          marginBottom: isMobile ? '15px' : 0,
          marginRight: isMobile ? 0 : '20px',
        }}
      >
        {isNameEditable ? (
          <TextField
            value={lessonName}
            onChange={handleNameChange}
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            sx={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: '500',
              marginBottom: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              width: isMobile ? '100%' : '400px',
            }}
          />
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              wordBreak: 'break-word',
            }}
          >
            {lessonName}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          Generated: {formatDate(lesson.createdAt)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: isMobile ? 'center' : 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {isEditing ? (
          isNameEditable ? (
            <>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSaveClick}
                sx={{
                  textTransform: 'none',
                  color: '#4CAF50',
                  borderColor: '#4CAF50',
                  backgroundColor: '#E8F5E9',
                  '&:hover': {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                    borderColor: '#4CAF50',
                  },
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                sx={{
                  textTransform: 'none',
                  color: '#FF5252',
                  borderColor: '#FF5252',
                  backgroundColor: '#FFE6E6',
                  '&:hover': {
                    backgroundColor: '#FF5252',
                    color: '#FFFFFF',
                    borderColor: '#FF5252',
                  },
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
              sx={{
                textTransform: 'none',
                color: '#2196F3',
                borderColor: '#2196F3',
                backgroundColor: '#E3F2FD',
                '&:hover': {
                  backgroundColor: '#2196F3',
                  color: '#FFFFFF',
                  borderColor: '#2196F3',
                },
              }}
            >
              Edit
            </Button>
          )
        ) : (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadClick}
            sx={{ textTransform: 'none', backgroundColor: 'white' }}
          >
            Download
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default LessonItem
