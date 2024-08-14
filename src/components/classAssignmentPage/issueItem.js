import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Stack,
  Collapse,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from '@mui/material'
import CircularProgressWithLabel from '@/components/classAssignmentPage/circularProgressWithLabel'
import { BLUE } from '@/theme/palette'

const IssueItem = ({ issue, maxAssignments, isEditing, onEditIssue, onDeleteIssue }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showDescription, setShowDescription] = useState(false)
  const [boxHeight, setBoxHeight] = useState('4rem')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedIssue, setEditedIssue] = useState(issue)
  const parentRef = useRef(null)

  useEffect(() => {
    setIsEditMode(isEditing)
    setShowDescription(isEditing)
  }, [isEditing])

  useEffect(() => {
    if (parentRef.current) {
      if (showDescription) {
        const computedStyle = window.getComputedStyle(parentRef.current)
        const paddingTop = parseInt(computedStyle.paddingTop)
        const paddingBottom = parseInt(computedStyle.paddingBottom)
        const totalHeight = parentRef.current.offsetHeight + paddingTop + paddingBottom
        setBoxHeight(`${totalHeight * 0.8}px`)
      } else {
        setBoxHeight('4rem')
      }
    }
  }, [showDescription])

  const handleToggleDescription = () => {
    if (!isEditMode) {
      setShowDescription((prev) => !prev)
    }
  }

  const handleEditClick = (event) => {
    event.stopPropagation()
    setIsEditMode(true)
    setShowDescription(true)
  }

  const handleDoneClick = (event) => {
    event.stopPropagation()
    onEditIssue(editedIssue)
  }

  const handleDeleteClick = (event) => {
    event.stopPropagation()
    onDeleteIssue(issue.id)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'studentCount' && (value <= 0 || value > maxAssignments || value === '')) {
      return // Prevent changes if studentCount is less than or equal to 0 or empty
    }
    setEditedIssue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderEditMode = () => (
    <Stack spacing={2} width="100%">
      <TextField
        name="name"
        value={editedIssue.name}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ fontWeight: '500', fontSize: isMobile ? '1rem' : '1.2rem' }}
      />
      <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 400, whiteSpace: 'nowrap' }}
          >
            Student Count:
          </Typography>
          <TextField
            name="studentCount"
            value={editedIssue.studentCount}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ width: '80px' }}
            inputProps={{ type: 'number' }}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary" onClick={handleDoneClick} size="small">
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteClick} size="small">
            Delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )

  const renderViewMode = () => (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems={isMobile ? 'flex-start' : 'center'}
      width="100%"
      spacing={isMobile ? 2 : 1}
    >
      <Typography variant="h6" sx={{ fontWeight: '500', fontSize: isMobile ? '1.1rem' : '1.3rem' }}>
        {issue.name}
      </Typography>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        spacing={2}
        width={isMobile ? '100%' : 'auto'}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          width={isMobile ? '100%' : 'auto'}
          justifyContent={isMobile ? 'space-between' : 'flex-start'}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 400 }}>
              Student Count:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {issue.studentCount}
            </Typography>
          </Stack>
          <CircularProgressWithLabel value={issue.studentRate} size={42} thickness={4} />
        </Stack>
        {/* {isEditing && (
          <Box display="flex" justifyContent={isMobile ? 'center' : 'flex-end'} width="100%">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#FF6F61',
                color: '#FF6F61',
                '&:hover': {
                  backgroundColor: 'rgba(255, 111, 97, 0.1)',
                  borderColor: '#FF6F61',
                },
                padding: '5px 10px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
              onClick={handleEditClick}
              size="small"
            >
              EDIT / REMOVE
            </Button>
          </Box>
        )} */}
      </Stack>
    </Stack>
  )

  return (
    <Box
      ref={parentRef}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      margin="10px"
      onClick={handleToggleDescription}
      sx={{
        border: `4px solid ${BLUE.main}`,
        padding: '16px',
        paddingLeft: '0',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          backgroundColor: BLUE.main,
          width: '12px',
          height: boxHeight,
          borderRadius: '0 5px 5px 0',
          marginRight: '15px',
          transition: 'height 0.3s ease',
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {isEditMode ? renderEditMode() : renderViewMode()}
        <Collapse in={showDescription} timeout="auto" unmountOnExit>
          <Box mt={2}>
            {isEditMode ? (
              <TextField
                name="description"
                value={editedIssue.description}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={4}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                {issue.description}
              </Typography>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default IssueItem
