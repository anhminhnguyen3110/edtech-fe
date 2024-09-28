import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import HistoryItem from './histtoryItem'

const HistoryList = ({ gameHistory }) => {
  console.log('gameHistory: ', gameHistory)
  return (
    <Box>
      {gameHistory.length > 0 ? (
        gameHistory.map((history) => <HistoryItem key={history.id} game={history} />)
      ) : (
        <Box>No questions available.</Box>
      )}
    </Box>
  )
}

export default HistoryList
