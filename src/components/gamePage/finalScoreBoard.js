import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'

const FinalScoreBoard = ({ scoreboard, quizName }) => {
  // Sort the scoreboard based on playerRank and take the top 3
  const sortedScoreboard = scoreboard.sort((a, b) => a.rank - b.rank).slice(0, 3)
  console.log(sortedScoreboard)

  const trophyIcons = {
    1: '/first-trophy.png',
    2: '/second-trophy.png',
    3: '/third-trophy.png',
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '5rem',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ marginBottom: '7rem' }}>
        {quizName}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ marginBottom: '3rem', fontWeight: 'bold' }}>
        Winner
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 15,
        }}
      >
        {sortedScoreboard.length >= 3 ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={trophyIcons[2]}
                alt="2nd place trophy"
                sx={{ width: 110, height: 110, mb: 2 }}
              />
              <Typography variant="h4">2nd Place</Typography>
              <Typography variant="h4" fontWeight="bold">
                {sortedScoreboard[1].playerNickname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={trophyIcons[1]}
                alt="1st place trophy"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Typography variant="h4">1st Place</Typography>
              <Typography variant="h4" fontWeight="bold">
                {sortedScoreboard[0].playerNickname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={trophyIcons[3]}
                alt="3rd place trophy"
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h4">3rd Place</Typography>
              <Typography variant="h4" fontWeight="bold">
                {sortedScoreboard[2].playerNickname}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {sortedScoreboard.length >= 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={trophyIcons[1]}
                  alt="1st place trophy"
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <Typography variant="h4">1st Place</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {sortedScoreboard[0].playerNickname}
                </Typography>
              </Box>
            )}
            {sortedScoreboard.length >= 2 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={trophyIcons[2]}
                  alt="2nd place trophy"
                  sx={{ width: 110, height: 110, mb: 2 }}
                />
                <Typography variant="h4">2nd Place</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {sortedScoreboard[1].playerNickname}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default FinalScoreBoard
