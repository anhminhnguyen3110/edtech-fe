import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'

const GameScoreboard = ({ result, handleNext }) => {
  // Sort the result array based on playerRank
  console.log(result)
  const sortedResults = result.sort((a, b) => a.playerRank - b.playerRank)

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem',
        // justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: BLUE.main,
        }}
      >
        Next
      </Button>
      <Typography variant="h2" gutterBottom>
        Scoreboard
      </Typography>
      {sortedResults.map((player, index) => (
        <Box
          key={player.playerId}
          sx={{
            width: '50%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: BLUE.main,
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '15px',
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', fontSize: '2rem' }}>
            {player.playerNickname}
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', fontSize: '2rem' }}>
            {Math.round(player.playerScore)}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default GameScoreboard
