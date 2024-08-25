import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { BLUE } from '@/theme/palette'

const FinalScoreBoard = ({ scoreboard, quizName, onReturn }) => {
  const sortedScoreboard = scoreboard.sort((a, b) => a.rank - b.rank).slice(0, 3)

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
        padding: { xs: '1rem', sm: '2rem' },
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: { xs: '1rem', sm: '2rem' } }}>
        {quizName}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: { xs: 2, sm: 10 },
          flexWrap: 'wrap',
          maxWidth: '100%',
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
                sx={{
                  width: { xs: '20vw', sm: '15vw' },
                  height: 'auto', // Maintain aspect ratio
                  maxHeight: '15vh',
                  objectFit: 'contain', // Ensure image is fully visible within bounds
                  mb: 2,
                }}
              />
              <Typography variant="h6">2nd Place</Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem', lg: '2.2rem' } }}
              >
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
                sx={{
                  width: { xs: '25vw', sm: '20vw' },
                  height: 'auto', // Maintain aspect ratio
                  maxHeight: '20vh',
                  objectFit: 'contain',
                  mb: 2,
                }}
              />
              <Typography variant="h6">1st Place</Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem', lg: '2.2rem' } }}
              >
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
                sx={{
                  width: { xs: '15vw', sm: '10vw' },
                  height: 'auto', // Maintain aspect ratio
                  maxHeight: '10vh',
                  objectFit: 'contain',
                  mb: 2,
                }}
              />
              <Typography variant="h6">3rd Place</Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ fontSize: { xs: '0.9rem', sm: '1.4rem', md: '1.8rem' } }}
              >
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
                  sx={{
                    width: { xs: '25vw', sm: '20vw' },
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '20vh',
                    objectFit: 'contain',
                    mb: 2,
                  }}
                />
                <Typography variant="h6">1st Place</Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem', md: '1.8rem', lg: '2.2rem' } }}
                >
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
                  sx={{
                    width: { xs: '20vw', sm: '15vw' },
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '15vh',
                    objectFit: 'contain',
                    mb: 2,
                  }}
                />
                <Typography variant="h6">2nd Place</Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' } }}
                >
                  {sortedScoreboard[1].playerNickname}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={onReturn}
          sx={{
            backgroundColor: BLUE.main,
            padding: { xs: '8px 16px', sm: '10px 20px' },
            fontSize: { xs: '0.9rem', sm: '1.2rem' }, // Responsive font size
          }}
        >
          Return to Home
        </Button>
      </Box>
    </Box>
  )
}

export default FinalScoreBoard
