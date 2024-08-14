import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, useTheme, Stack, Button } from '@mui/material'
import PaginationComponent from '@/components/pagination/pagination'
import LessonItem from '@/components/classAssignmentPage/lessonItem' // Ensure the correct import path
import ButtonComponent from '@/components/button/buttonComponent'
import MessageBox from '@/components/box/messageBox' // Ensure the correct import path
import EditIcon from '@mui/icons-material/Edit'
const LessonList = ({ lessons, onEditLesson, onDeleteLesson }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const [isEditing, setIsEditing] = useState(false) // General edit state

  const onEditClick = () => {
    setIsEditing((prev) => !prev) // Toggle the edit state
  }

  return (
    <Box
      sx={{
        margin: '3px',
        padding: '30px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ marginBottom: '16px' }}>
            Lessons
          </Typography>
        </Box>
      </Box>
      {lessons.length === 0 ? (
        <MessageBox message="There are no lessons to display. Extract to continue!" />
      ) : (
        <>
          <Stack display="row" spacing={3} sx={{ margin: '5px' }}>
            {lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                isEditing={isEditing}
                onEditLesson={onEditLesson}
                onDeleteLesson={onDeleteLesson}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  )
}

export default LessonList
