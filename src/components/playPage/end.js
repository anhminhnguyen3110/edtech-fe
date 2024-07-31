/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'
import { BLUE } from '@/theme/palette'

const End = ({ player }) => {
  console.log(player)
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      bgcolor={BLUE.main}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              src="/first-trophy.png"
              alt="Trophy"
              sx={{ width: 110, height: 110, mb: 2 }}
            />
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              color={BLUE.darker}
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Good Job!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color={BLUE.darker}
              fontWeight="bold"
            >
              {Math.round(player.currentScore)} points
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color={BLUE.darker}
              fontWeight="bold"
            >
              You're ranked {player.rank}! Keep up the great work!
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default End
