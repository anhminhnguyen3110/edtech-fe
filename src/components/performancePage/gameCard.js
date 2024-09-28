import React from 'react'
import { Card, CardContent, Typography, Checkbox, Box } from '@mui/material'
import StatusChip from '@/components/quizStatistics/statusChip'

const GameCard = ({ game, isSelected, onSelect }) => {
  return (
    <Card sx={{ mb: 2, border: isSelected ? '2px solid green' : '1px solid grey' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="subtitle1">{game.quizName}</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Box sx={{ maxWidth: '7rem' }}>
              <StatusChip
                status={game.gameStatus === 'COMPLETED' ? 'success' : 'error'}
                text={game.gameStatus === 'COMPLETED' ? 'Finished' : 'Interrupted'}
                sx={{ width: 'fit-content' }}
              />
            </Box>
            <Typography variant="body1" sx={{ fontSize: '14px' }} color="textSecondary">
              {new Date(game.startedAt).toLocaleString()} -{' '}
              {new Date(game.endedAt).toLocaleString()}
            </Typography>
          </div>
        </div>
        <Checkbox checked={isSelected} onChange={onSelect} />
      </CardContent>
    </Card>
  )
}

export default GameCard
