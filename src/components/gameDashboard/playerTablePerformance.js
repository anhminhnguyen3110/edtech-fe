import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { BLUE } from '@/theme/palette'
import NaNDisplay from './nanDisplay'
const PlayerTablePerformance = ({ playerHistory }) => {
  if (!playerHistory || !playerHistory.questionsPerformance) {
    return <NaNDisplay />
  }

  const getRankTrendIcon = (currentRank, prevRank) => {
    if (prevRank === null) {
      return <HorizontalRuleIcon /> // First row, no trend available
    }
    if (currentRank < prevRank) {
      return <ArrowUpwardIcon color="success" />
    } else if (currentRank > prevRank) {
      return <ArrowDownwardIcon color="error" />
    }
    return <HorizontalRuleIcon /> // Rank unchanged
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: BLUE.main }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Question</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rank</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Result</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerHistory.questionsPerformance.map((question, index) => {
            const prevQuestion = playerHistory.questionsPerformance[index - 1]
            const prevRank = prevQuestion ? prevQuestion.currentRank : null

            return (
              <TableRow
                key={question.questionId}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 300,
                      whiteSpace: 'normal', // Allows text to wrap
                      wordWrap: 'break-word', // Breaks long words
                      overflowWrap: 'break-word', // Ensures proper wrapping of content
                    }}
                  >
                    {question.questionText}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getRankTrendIcon(question.currentRank, prevRank)}
                    <Typography sx={{ ml: 1 }}>{question.currentRank}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color={question.isCorrect ? 'success.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{question.currentScore}</Typography>
                    {question.scoresGained > 0 && (
                      <Typography component="span" color="success.main" sx={{ ml: 1 }}>
                        (+{question.scoresGained})
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {question.timeSubmittedInSecond !== null
                    ? `${question.timeSubmittedInSecond.toFixed(2)}s`
                    : 'N/A'}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlayerTablePerformance
