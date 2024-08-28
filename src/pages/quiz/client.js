import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '@/components/searchBar/searchBar'
import PaginationComponent from '@/components/pagination/pagination'
import QuizItem from '@/components/quizPage/quizItem'
import ButtonComponent from '@/components/button/buttonComponent'
import {
  Container,
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material' // Import necessary components
import api from '@/lib/api'
import { BLUE, GRAY } from '@/theme/palette'
import CustomSnackbar from '@/components/snackBar/customSnackBar'
import MessageBox from '@/components/box/messageBox'
import { useRouter } from 'next/router'
import { sortBy } from 'underscore'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import GenerateQuizModal from '@/components/quizPage/generateQuizModal'
import AddIcon from '@mui/icons-material/Add'
import { io } from 'socket.io-client'
import { useAuth } from '@/context/authContext'

export const QuizPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // Check if the screen is mobile-sized
  const [quizzes, setQuizzes] = useState([]) // State to hold quizzes data
  const [totalPages, setTotalPages] = useState(1) // Total number of pages
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const itemsPerPage = 4 // Items per page
  const [errorMessage, setErrorMessage] = useState(null) // State to hold error message
  const [openSnackbar, setOpenSnackbar] = useState(false) // State to control Snackbar open state
  const [severity, setSeverity] = useState('error') // State to control Snackbar severity
  const [loading, setLoading] = useState(false) // State to manage loading state
  const router = useRouter()
  const [openQuizModal, setOpenQuizModal] = useState(false) // State to control modal open state
  const { accessToken } = useAuth()
  const socket = useRef(null)

  const fetchData = async (page = 1, searchQuery = '') => {
    try {
      const response = await api.get('/quizzes', {
        authRequired: true,
        params: {
          page: page,
          limit: itemsPerPage,
          search: searchQuery, // Include search query in params if provided
          sortBy: 'createdAt', // Sort by createdAt field
          sortDirection: 'DESC', // Order in descending order
        },
      })
      const { items, meta } = response.data
      console.log('Fetched data:', items)
      console.log('Meta data:', meta)
      setQuizzes(items) // Set fetched quizzes
      setTotalPages(meta.totalPages) // Update total pages from meta data
      setCurrentPage(meta.currentPage) // Update current page from meta data
    } catch (error) {
      console.error('Error fetching data:', error)
      setErrorMessage('Error while fetching data.') // Set error message state
      setSeverity('error')
      setOpenSnackbar(true) // Open Snackbar on error
    }
  }

  const addNewQuestion = async (quizId) => {
    const formData = new FormData()
    formData.append('quizId', quizId)
    formData.append('questionText', 'New Question')
    formData.append('questionType', 'MULTIPLE_CHOICE')
    formData.append('timeLimitInSecond', 20)

    const choices = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
    const correctAnswers = ['Answer 1']
    formData.append('choices', choices.join('\0'))
    formData.append('correctAnswers', correctAnswers.join('\0'))

    try {
      const response = await api.post('/questions', formData, { authRequired: true })
      console.log('New question created successfully:', response.data)
      const newQuestion = {
        id: response.data.id,
        text: 'New Question',
        type: 'MULTIPLE_CHOICE',
        timing: 20,
        correctAnswer: [0],
        image: null,
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      }
    } catch (error) {
      console.error(
        'Error creating new question:',
        error.response ? error.response.data : error.message
      )
      setErrorMessage('Error in creating a new question. Try again later!')
      setSnackbarOpen(true)
    }
  }

  const handleOpenQuizModal = () => {
    setOpenQuizModal(true)
  }

  const handleCloseQuizModal = () => {
    setOpenQuizModal(false)
  }

  const handleGenerateQuiz = async (prompt, multipleChoice, trueFalse, multipleAnswer) => {
    try {
      const response = await api.post(
        `/quizzes/generate`,
        {
          prompt: prompt,
          numberOfMultipleChoiceQuestions: multipleChoice,
          numberOfTrueFalseQuestions: trueFalse,
          numberOfMultipleAnswerQuestions: multipleAnswer,
        },
        { authRequired: true }
      )
      if (response.status === 201) {
        const message = response.data.message
        setErrorMessage(message)
        setSeverity('success')
        setOpenSnackbar(true)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to generate quiz.'
      setErrorMessage(message)
      setSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleCreateQuiz = async () => {
    try {
      setLoading(true) // Set loading state to true when starting the API call
      console.log('Creating quiz...')

      const response = await api.post(
        '/quizzes',
        {
          name: 'Untitled Quiz',
          description: 'Random description',
        },
        {
          authRequired: true, // Include authRequired: true in the options
        }
      )

      console.log('Quiz created:', response.data)
      await addNewQuestion(response.data.id)

      await fetchData() // Fetch data again to update quiz list
      router.push(`/quiz/${response.data.id}`) // Redirect to the newly created quiz
    } catch (error) {
      console.error('Error creating quiz:', error)
      setErrorMessage('Error while creating quiz.')
      setSeverity('error')
      setOpenSnackbar(true)
    } finally {
      setLoading(false) // Set loading state to false regardless of success or failure
    }
  }

  const handleSearch = async (value) => {
    // Trigger fetch data with search query
    await fetchData(1, value) // Always start from the first page when searching
  }

  const handleChange = async (event, value) => {
    setCurrentPage(value) // Update current page
    await fetchData(value) // Fetch data for the new page
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false) // Close Snackbar
  }

  useEffect(() => {
    if (!accessToken) {
      return
    }

    socket.current = io(process.env.NEXT_PUBLIC_NOTIFICATION_WEB_SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: `${accessToken}`,
      },
    })

    socket.current.on('connect', () => {
      console.log('Socket connected successfully')
    })

    socket.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    socket.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err)
    })

    const successEventTypes = ['GENERATE_QUIZ_SUCCESS']

    const failedEventTypes = ['GENERATE_QUIZ_FAILED']

    successEventTypes.forEach((eventType) => {
      socket.current.on(eventType, (data) => {
        console.log(`Received event type in page: ${eventType}`, data)
        console.log(data.message)
        setErrorMessage(data.message)
        setSeverity('success')
        setOpenSnackbar(true)
        fetchData()
        setCurrentPage(1)
      })
    })

    failedEventTypes.forEach((eventType) => {
      socket.current.on(eventType, (data) => {
        console.log(`Received event: ${eventType}`, data)
        setErrorMessage(data.message)
        setSeverity('fail')
        setOpenSnackbar(true)
      })
    })

    return () => {
      successEventTypes.forEach((eventType) => {
        socket.current.off(eventType)
      })
      failedEventTypes.forEach((eventType) => {
        socket.current.off(eventType)
      })
      socket.current.disconnect()
    }
  }, [accessToken])

  useEffect(() => {
    fetchData() // Fetch initial data on component mount
  }, [])

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        marginTop="20px"
        marginBottom="32px"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: '600', marginBottom: isMobile ? '16px' : '0' }}
        >
          Quizzes
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexDirection={isMobile ? 'column' : 'row'}
          marginTop={2}
          justifyContent="space-between"
        >
          <Box sx={{}}>
            <SearchBar placeholder="Search quizzes..." onSearch={handleSearch} />{' '}
          </Box>
          {/* Pass handleSearch function as prop */}
          <ButtonComponent
            onClick={handleCreateQuiz}
            variant="contained"
            disabled={loading} // Disable button when loading
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {loading && (
              <CircularProgress size={24} sx={{ color: '#ffffff', marginRight: '5px' }} />
            )}
            {!loading && <AddIcon />}
            <span>Create Quiz</span>
          </ButtonComponent>
          <ButtonComponent
            onClick={handleOpenQuizModal}
            variant="contained"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <VideogameAssetIcon />
            Generate Quiz
          </ButtonComponent>
        </Box>
      </Box>
      <NotificationSnackbar
        open={openSnackbar}
        message={errorMessage}
        type={severity}
        onClose={handleCloseSnackbar}
      />
      <GenerateQuizModal
        open={openQuizModal}
        handleClose={handleCloseQuizModal}
        generateQuiz={handleGenerateQuiz}
      />
      {quizzes.length === 0 ? (
        <MessageBox message="No quizzes found." />
      ) : (
        <>
          <Box marginTop="32px" sx={{ maxWidth: '90vw' }}>
            {quizzes.map((quiz) => (
              <QuizItem key={quiz.id} quiz={quiz} />
            ))}
          </Box>
          <Box marginTop="32px" display="flex" justifyContent="center">
            <PaginationComponent count={totalPages} page={currentPage} onChange={handleChange} />
          </Box>
        </>
      )}
    </Container>
  )
}

export default QuizPage
