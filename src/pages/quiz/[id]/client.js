import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Button,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import QuestionList from '@/components/quizPage/questionList'
import QuestionEditor from '@/components/quizPage/questionEditor'
import OptionsPanel from '@/components/quizPage/optionsPanel'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import { times } from 'underscore'

const QuizCreator = () => {
  const [quizName, setQuizName] = useState('Sample Quiz')
  const [isEditingQuizName, setIsEditingQuizName] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedQuestionId, setSelectedQuestionId] = useState(1)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [unsavedQuizNameChanges, setUnsavedQuizNameChanges] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()
  const { id } = router.query

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)

  useEffect(() => {
    if (id) {
      fetchQuizData(id)
    }
  }, [id])

  const fetchQuizData = async (quizId) => {
    setLoading(true)
    setError(false)
    try {
      const response = await api.get(`/quizzes/detail/${quizId}`, { authRequired: true })
      const quizData = response.data
      console.log('Quiz data:', quizData)
      // Transform the questions
      const transformedQuestions = quizData.questions.map((question) => ({
        id: question.id,
        text: question.questionText,
        type: question.questionType,
        correctAnswer:
          question.questionType === 'MULTIPLE_OPTIONS'
            ? question.correctAnswers.map((answer) => question.choices.indexOf(answer))
            : [question.choices.indexOf(question.correctAnswers[0])],
        timing: question.timeLimitInSecond,
        image: question.imageFileUrl,
        answers: question.choices,
      }))

      setQuestions(transformedQuestions)
      setQuizName(quizData.name)
      setSelectedQuestionId(transformedQuestions[0]?.id || null)
    } catch (error) {
      console.error('Error fetching quiz data:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionSelect = (id) => {
    if (unsavedChanges) {
      setSnackbarOpen(true)
      return
    }
    setSelectedQuestionId(id)
  }

  const handleQuestionUpdate = (updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === selectedQuestionId ? updatedQuestion : q)))
    setUnsavedChanges(true)
  }

  const addNewQuestion = async () => {
    const formData = new FormData()
    formData.append('quizId', id)
    formData.append('questionText', 'New Question')
    formData.append('questionType', 'MULTIPLE_CHOICE')
    formData.append('timeLimitInSecond', 20)

    const choices = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
    const correctAnswers = ['Answer 1']
    formData.append('choices', choices)
    formData.append('correctAnswers', correctAnswers)

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
      setQuestions([...questions, newQuestion])
      setSelectedQuestionId(newQuestion.id)
      setUnsavedChanges(false)
    } catch (error) {
      console.error(
        'Error creating new question:',
        error.response ? error.response.data : error.message
      )
      setErrorMessage('Error in creating a new question. Try again later!')
      setSnackbarOpen(true)
    }
  }

  const deleteQuestion = async () => {
    const newQuestions = questions.filter((q) => q.id !== selectedQuestionId)
    try {
      await api.delete(`/questions/${selectedQuestionId}`, { authRequired: true })
      setQuestions(newQuestions)
      setSelectedQuestionId(newQuestions[0]?.id || null)
      setUnsavedChanges(false)
    } catch (error) {
      console.error('Error deleting question:', error)
      setErrorMessage('Error in deleting the question. Try again later!')
      setSnackbarOpen(true)
      return
    }
  }

  const handleBackClick = () => {
    router.push('/quiz')
  }

  const handleSaveQuestions = async () => {
    if (!selectedQuestion) return
    console.log('Saving question:', selectedQuestion)

    // Check if answers are unique
    const uniqueAnswers = new Set(selectedQuestion.answers)
    if (uniqueAnswers.size !== selectedQuestion.answers.length) {
      setErrorMessage('Answers must be unique.')
      setSnackbarOpen(true)
      return
    }

    if (selectedQuestion.type === 'MULTIPLE_OPTIONS' && selectedQuestion.correctAnswer.length < 2) {
      setErrorMessage('Select at least 2 correct answers for multiple options.')
      setSnackbarOpen(true)
      return
    }

    const formData = new FormData()
    formData.append('quizId', id)
    formData.append('questionText', selectedQuestion.text)
    formData.append('questionType', selectedQuestion.type.toUpperCase())
    formData.append('choices', selectedQuestion.answers)
    // formData.append('correctAnswers', [selectedQuestion.answers[selectedQuestion.correctAnswer]]);
    const correctAnswers = selectedQuestion.correctAnswer.map(
      (index) => selectedQuestion.answers[index]
    )
    formData.append('correctAnswers', correctAnswers)
    // selectedQuestion.correctAnswer.forEach(index => formData.append('correctAnswers', selectedQuestion.answers[index]));
    formData.append('timeLimitInSecond', selectedQuestion.timing)

    const isBase64Image =
      typeof selectedQuestion.image === 'string' && selectedQuestion.image.startsWith('data:image')
    const isS3URL =
      typeof selectedQuestion.image === 'string' && selectedQuestion.image.startsWith('https://')

    if (
      selectedQuestion.image === null ||
      selectedQuestion.image instanceof File ||
      isBase64Image
    ) {
      let imageFile = selectedQuestion.image
      if (isBase64Image) {
        const byteString = atob(selectedQuestion.image.split(',')[1])
        const mimeString = selectedQuestion.image.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        imageFile = new File([ab], 'image.png', { type: mimeString })
      }
      formData.append('image', imageFile) // Add the image file to the form data
      formData.append('updateImage', true) // Set updateImage to true if the image is a file
    } else if (isS3URL) {
      formData.append('updateImage', false) // Set updateImage to false if the image is an S3 URL
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }

    try {
      await api.put(`/questions/${selectedQuestion.id}`, formData, { authRequired: true })
      setUnsavedChanges(false)
      setSnackbarOpen(false)
      setErrorMessage('') // Clear any previous error message
    } catch (error) {
      console.error('Error saving question:', error)
      setErrorMessage('Error saving question. Try again later!')
      setSnackbarOpen(true)
    }
  }

  const handleSaveQuizName = async () => {
    try {
      await api.patch(`/quizzes/${id}`, { name: quizName }, { authRequired: true })
      setUnsavedQuizNameChanges(false)
      setIsEditingQuizName(false)
    } catch (error) {
      console.error('Error saving quiz name:', error)
      setErrorMessage('Error in saving quiz name. Try again later!')
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
    setErrorMessage('')
  }

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value)
    setUnsavedQuizNameChanges(true)
  }

  const toggleEditQuizName = () => {
    if (isEditingQuizName && unsavedQuizNameChanges) {
      handleSaveQuizName()
    } else {
      setIsEditingQuizName(!isEditingQuizName)
    }
  }

  const handleDeleteQuiz = async () => {
    try {
      const response = await api.delete(`/quizzes/${id}`, {
        authRequired: true, // Include authRequired: true in the options
      })
      console.log('Quiz deleted:', response.data)
      // Navigate back to the quiz list page
      router.push('/quiz')
    } catch (error) {
      console.error('Error deleting quiz:', error)
      setErrorMessage('Error while deleting quiz.')
      setSnackbarOpen(true)
    } finally {
      setLoading(false) // Set loading state to false regardless of success or failure
    }
  }

  if (loading) {
    return (
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 5 }}>
        Loading...
      </Typography>
    )
  }

  if (error) {
    return (
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 5 }}>
        No Quiz Found
      </Typography>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1 }} onClick={handleBackClick}>
          <ArrowBackIosIcon />
        </IconButton>
        {isEditingQuizName ? (
          <TextField
            variant="outlined"
            label="Quiz Name"
            value={quizName}
            onChange={handleQuizNameChange}
            sx={{ flexGrow: 1, mr: 2 }}
          />
        ) : (
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {quizName}
          </Typography>
        )}
        <IconButton onClick={toggleEditQuizName}>
          {isEditingQuizName ? <CheckIcon /> : <EditIcon />}
        </IconButton>
        <IconButton onClick={handleDeleteQuiz} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <QuestionList
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onSelect={handleQuestionSelect}
            onAdd={addNewQuestion}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {selectedQuestion && (
            <QuestionEditor
              question={selectedQuestion}
              onUpdate={handleQuestionUpdate}
              unsavedChanges={unsavedChanges}
              onSave={handleSaveQuestions}
              onDelete={deleteQuestion}
            />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {selectedQuestion && (
            <OptionsPanel question={selectedQuestion} onUpdate={handleQuestionUpdate} />
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ bottom: '-450px', zIndex: 1400 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={errorMessage ? 'error' : 'info'}
          sx={{ width: '100%' }}
        >
          {errorMessage || 'Please save your changes before proceeding.'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default QuizCreator
