// components/assessmentPage/ClassesList.js
import React, { useState } from 'react'
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material'
import RubricItem from '@/components/assessmentPage/rubricItem'
import PaginationComponent from '@/components/pagination/pagination'
import CustomBox from '@/components/box/customBox'
import { BLUE } from '@/theme/palette'
import { useRouter } from 'next/router'

const ClassesList = ({ classes, assignmentId }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(classes.length / itemsPerPage)
  const router = useRouter()

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentClasses = classes.slice(startIndex, startIndex + itemsPerPage)

  const onViewClick = (classAssignmentId) => {
    router.push(`/assignment/${assignmentId}/class-assignment/${classAssignmentId}`)
  }

  return (
    <Box sx={{ margin: '3px' }}>
      {currentClasses.map((classItem) => (
        <CustomBox key={classItem.id}>
          <Box display="flex" alignItems="center" justifyContent="space-between" margin="10px">
            <Typography variant="h6">{classItem.name}</Typography>
            <Button
              variant="outlined"
              onClick={() => onViewClick(classItem.classAssignmentId)}
              sx={{
                marginLeft: '16px',
                borderColor: '#90caf9', // Border color similar to the example
                borderRadius: '8px', // Rounded corners
                padding: '5px 12px', // Reduced padding for a thinner appearance
                width: '7rem', // Specific width to make the button longer
                color: BLUE.main, // Text color similar to the example
                '&:hover': {
                  backgroundColor: '#e3f2fd', // Light blue background on hover
                  borderColor: '#90caf9', // Keep border color on hover
                },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
                View
              </Typography>
            </Button>
          </Box>
        </CustomBox>
      ))}
      <Box marginTop="32px" display="flex" justifyContent="center">
        <PaginationComponent count={totalPages} page={currentPage} onChange={handleChange} />
      </Box>
    </Box>
  )
}

export default ClassesList
