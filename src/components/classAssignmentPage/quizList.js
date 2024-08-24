/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery, useTheme, Stack } from '@mui/material'
import PaginationComponent from '@/components/pagination/pagination'
import MessageBox from '@/components/box/messageBox' // Ensure the correct import path
import QuizItem from '@/components/quizPage/quizItem'
import api from '@/lib/api' // Ensure the correct import path for your API module

const QuizList = ({ classAssignmentId, reload, setReload }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const [quizzes, setQuizzes] = useState([]) // State to hold quizzes data
  const [totalPages, setTotalPages] = useState(1) // Total number of pages
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const itemsPerPage = 4 // Items per page

  const fetchQuiz = async (id, page) => {
    setLoading(true)
    setError(false)
    try {
      const response = await api.get('/quizzes', {
        params: {
          limit: itemsPerPage,
          page: page,
          sortBy: 'createdAt', // Sort by createdAt field
          sortDirection: 'DESC', // Order in descending order
          classAssignmentId: id,
        },
        authRequired: true,
      })

      const { items, meta } = response.data
      console.log('Fetched data:', items)
      console.log('Meta data:', meta)
      setQuizzes(items) // Set fetched quizzes
      setTotalPages(meta.totalPages) // Update total pages from meta data
      setCurrentPage(meta.currentPage) // Update current page from meta data
    } catch (error) {
      console.error('Error fetching quiz data:', error)
      setError(true)
    } finally {
      setLoading(false)
      setReload(false)
    }
  }

  useEffect(() => {
    fetchQuiz(classAssignmentId, currentPage)
  }, [classAssignmentId, currentPage, reload])

  const handleChange = (event, value) => {
    setCurrentPage(value)
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
            Quizzes
          </Typography>
        </Box>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <MessageBox message="Error fetching quizzes." />
      ) : quizzes.length === 0 ? (
        <MessageBox message="There are no quizzes to display. Extract to continue!" />
      ) : (
        <>
          <Stack spacing={3} sx={{ margin: '5px' }}>
            {quizzes.map((quiz) => (
              <QuizItem key={quiz.id} quiz={quiz} />
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

export default QuizList
