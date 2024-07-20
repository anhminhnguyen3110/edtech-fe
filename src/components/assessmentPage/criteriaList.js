// components/assessmentPage/CriteriaList.js
import React, { useState } from 'react'
import { Box } from '@mui/material'
import RubricItem from '@/components/assessmentPage/rubricItem'
import PaginationComponent from '@/components/pagination/pagination'

const CriteriaList = ({ criteria }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(criteria.length / itemsPerPage)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentCriteria = criteria.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Box>
      {currentCriteria.map((rubric) => (
        <RubricItem key={rubric.id} rubric={rubric} />
      ))}
      <Box marginTop="32px" display="flex" justifyContent="center">
        <PaginationComponent count={totalPages} page={currentPage} onChange={handleChange} />
      </Box>
    </Box>
  )
}

export default CriteriaList
