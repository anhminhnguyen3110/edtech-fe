import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { BLUE } from '@/theme/palette'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
const QuestionTablePerformance = ({ questionHistory }) => {
  if (!questionHistory || !questionHistory.players || questionHistory.players.length === 0) {
    return <Typography>No data available</Typography>
  }

  const { players, correctAnswer } = questionHistory

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table aria-label="question performance table" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: BLUE.main }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nickname</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Result</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Answers</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score Gained</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time Submitted (s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.playerId}
              sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
            >
              <TableCell>{player.nickname}</TableCell>
              <TableCell>
                <Typography
                  color={player.isCorrect ? 'success.main' : 'error.main'}
                  fontWeight="bold"
                >
                  {player.isCorrect ? 'Correct' : 'Incorrect'}
                </Typography>
              </TableCell>
              <TableCell>
                {player.playerAnswer ? (
                  <div style={{ margin: 0 }}>
                    {player.playerAnswer.map((answer, index) => (
                      <div
                        key={index}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                      >
                        {correctAnswer.includes(answer) ? (
                          <CheckCircle style={{ color: 'green', marginRight: '5px' }} />
                        ) : (
                          <Cancel style={{ color: 'red', marginRight: '5px' }} />
                        )}
                        <span>{answer}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RemoveCircleIcon style={{ color: 'gray', marginRight: '5px' }} />
                    <span>No answer</span>
                  </div>
                )}
              </TableCell>

              <TableCell>
                {player.scoresGained > 0 ? `+${player.scoresGained}` : player.scoresGained}
              </TableCell>
              <TableCell>
                {player.timeSubmittedInSecond !== null
                  ? `${player.timeSubmittedInSecond.toFixed(2)}s`
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuestionTablePerformance
