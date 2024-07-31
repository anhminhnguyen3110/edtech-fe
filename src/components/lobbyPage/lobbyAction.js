import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'

const LobbyActions = ({ numPlayers, onNextClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      position="absolute"
      bottom={20}
      left={0}
      px={3}
      sx={{ padding: '4rem' }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={1}>
          {numPlayers}
        </Typography>
        <Button
          variant="contained"
          style={{ borderRadius: '20px', width: '150px', background: BLUE.main }}
        >
          Players
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={onNextClick}
        disabled={numPlayers === 0}
        sx={{
          borderRadius: '15px',
          width: '150px',
          height: '60px',
          backgroundColor: numPlayers === 0 ? 'gray' : BLUE.main,
          '&:hover': {
            backgroundColor: numPlayers === 0 ? 'gray' : BLUE.dark,
          },
        }}
      >
        Next
      </Button>
    </Box>
  )
}

export default LobbyActions
