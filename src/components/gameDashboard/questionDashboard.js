// QuestionDashboard.js
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import QuestionRow from './questionRow'
import QuestionModal from './questionModal'
const QuestionDashboard = ({ questions }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const handleOpenModal = (questionId) => {
    const question = questions.find((p) => p.questionId === questionId)
    if (question) {
      setSelectedQuestion(question)
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedQuestion(null)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Question dashboard table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}>
                Question
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Question Type
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Accuracy Rate
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <QuestionRow
                key={question.id}
                question={question}
                index={index}
                isMobile={isMobile}
                openModal={handleOpenModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <QuestionModal
        open={modalOpen}
        handleClose={handleCloseModal}
        question={selectedQuestion}
        questions={questions}
      />
    </>
  )
}

export default QuestionDashboard
