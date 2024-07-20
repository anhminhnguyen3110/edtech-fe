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
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditing, setIsEditing] = useState(false) // General edit state
  const itemsPerPage = 4
  const totalPages = Math.ceil(lessons.length / itemsPerPage)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentLessons = lessons.slice(startIndex, startIndex + itemsPerPage)

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
            Generated Lessons
          </Typography>
        </Box>
        {lessons.length > 0 && (
          <ButtonComponent onClick={onEditClick} style={{ marginTop: isMobile ? '16px' : '0' }}>
            <EditIcon sx={{ marginRight: '8px' }} />
            {isEditing ? 'Finish Editing' : 'Edit Lessons'}
          </ButtonComponent>
        )}
      </Box>
      {lessons.length === 0 ? (
        <MessageBox message="There are no lessons to display. Extract to continue!" />
      ) : (
        <>
          <Stack display="row" spacing={3} sx={{ margin: '5px' }}>
            {currentLessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                isEditing={isEditing}
                onEditLesson={onEditLesson}
                onDeleteLesson={onDeleteLesson}
              />
            ))}
          </Stack>
          <Box marginTop="32px" display="flex" justifyContent="center">
            <PaginationComponent count={totalPages} page={currentPage} onChange={handleChange} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default LessonList
