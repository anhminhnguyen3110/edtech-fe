import React from 'react'
import { Typography, Box } from '@mui/material'
import CriteriaList from './criteriaList' // Assuming CriteriaList is a custom component
import ClassesList from './classesList'
import CustomBox from '../box/customBox'

const AssignmentDetails = ({ assignment }) => {
  return (
    <Box>
      {/* Render the assignment details here */}
      <Box sx={{ margin: '10px' }}>
        <Typography variant="h6" sx={{ margin: '10px', fontSize: '1.7rem', fontWeight: '800' }}>
          Rubric
        </Typography>
        <CriteriaList criteria={assignment.criteria} />
      </Box>
      <Box sx={{ margin: '10px' }}>
        <Typography variant="h6" sx={{ margin: '10px', fontSize: '1.7rem', fontWeight: '800' }}>
          Classes
        </Typography>
        <ClassesList classes={assignment.classes} assignmentId={assignment.id} />
      </Box>
    </Box>
  )
}

export default AssignmentDetails
