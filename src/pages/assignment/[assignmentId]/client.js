import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import api from '@/lib/api'
import { useRouter } from 'next/router'
import MessageBox from '@/components/box/messageBox'
import AssignmentDetails from '@/components/assessmentPage/assignmentDetail'

const AssignmentDetail = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [assignment, setAssignment] = useState(null)
  const router = useRouter()
  const { assignmentId } = router.query

  const handleBackClick = () => {
    router.push('/assignment')
  }

  useEffect(() => {
    if (assignmentId) {
      fetchAssessment(assignmentId)
    }
  }, [assignmentId])

  const fetchAssessment = async (assignmentId) => {
    setLoading(true)
    setError(false)
    try {
      const response = await api.get(`/assignments/${assignmentId}`, { authRequired: true })
      const assignmentData = response.data
      console.log('Assignment data:', assignmentData)
      setAssignment(assignmentData)
    } catch (error) {
      console.error('Error fetching assignment data:', error)
      setError(true)
      setErrorMessage('No assignment found.')
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1, fontWeight: 'bold' }} onClick={handleBackClick}>
          <ArrowBackIosIcon sx={{ fontWeight: 'bold' }} />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {assignment ? assignment.name : 'Assignment Details'}
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <MessageBox message="No assignment found." />
      ) : (
        <Box>
          {/* Render the assignment details here */}
          <AssignmentDetails assignment={assignment} />
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AssignmentDetail
