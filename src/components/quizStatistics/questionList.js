import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import QuestionItem from '@/components/quizStatistics/questionItem'
import PaginationComponent from '@/components/pagination/pagination'
import usePagination from './usePagination'

const QuestionList = ({ questions }) => {
  const itemsPerPage = 4
  const [currentQuestions, setCurrentQuestions] = useState([])

  // Custom hook for pagination
  const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination(
    1,
    Math.ceil(questions.length / itemsPerPage)
  )

  // Update total pages when questions length changes
  useEffect(() => {
    const newTotalPages = Math.ceil(questions.length / itemsPerPage)
    setTotalPages(newTotalPages)

    // Ensure the current page is within valid bounds when the total pages change
    if (currentPage > newTotalPages) {
      handlePageChange(null, newTotalPages) // Adjust to the last valid page if the current one is out of range
    }
  }, [questions.length, setTotalPages, currentPage, handlePageChange])

  // Update currentQuestions when currentPage or questions change
  useEffect(() => {
    console.log('Current page:', currentPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const updatedQuestions = questions.slice(startIndex, startIndex + itemsPerPage)
    setCurrentQuestions(updatedQuestions)
  }, [currentPage, questions])

  return (
    <Box>
      {currentQuestions.length > 0 ? (
        currentQuestions.map((question) => <QuestionItem key={question.id} question={question} />)
      ) : (
        <Box>No questions available.</Box>
      )}
      <Box marginTop="32px" display="flex" justifyContent="center">
        <PaginationComponent count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default QuestionList
