// PlayerRow.js
import React from 'react'
import { TableCell, TableRow, Typography, Box, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Link from 'next/link'
import DonutChart from './donutChart'

const PlayerRow = ({ player, isMobile, openModal }) => {
  const totalQuestions =
    player.numberOfCorrectAnswers + player.numberOfWrongAnswers + player.numberOfUnansweredQuestions

  return (
    <TableRow key={player.id}>
      {/* Nickname */}
      <TableCell component="th" scope="row">
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            wordBreak: 'break-word',
          }}
        >
          {player.nickname}
        </Typography>
      </TableCell>

      {/* Rank Display */}
      <TableCell align="center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1rem' : '1.4rem',
              color: '#333',
              marginRight: '4px',
            }}
          >
            {player.finalRank}
          </Typography>
          <EmojiEventsIcon sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'gray' }} />
        </div>
      </TableCell>

      {/* Score Display */}
      <TableCell align="center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1rem' : '1.4rem',
              color: '#333',
              marginRight: '4px',
            }}
          >
            {player.finalScore}
          </Typography>
          <SportsScoreIcon sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'gray' }} />
        </div>
      </TableCell>

      {/* Donut Chart Display */}
      <TableCell align="center">
        <Box display="flex" alignItems="center" justifyContent="center">
          <DonutChart
            correct={player.numberOfCorrectAnswers}
            total={totalQuestions}
            type="questions"
          />
          <Typography variant="body1" sx={{ ml: 2 }}>
            {`${player.numberOfCorrectAnswers} / ${totalQuestions}`}
          </Typography>
        </Box>
      </TableCell>

      {/* Action Button */}
      <TableCell align="center">
        <Button
          variant="outlined"
          onClick={() => openModal(player.playerId)}
          sx={{
            borderColor: '#90caf9',
            borderRadius: '8px',
            padding: '5px 12px',
            width: '7rem',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#90caf9',
            },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
            View
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
