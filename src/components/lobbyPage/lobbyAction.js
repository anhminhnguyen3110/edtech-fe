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
      px={{ xs: 2, sm: 3, md: 4 }} // Responsive padding
      sx={{ padding: { xs: '2rem', sm: '3rem', md: '4rem' } }} // Adjusting padding for different screen sizes
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={1} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {numPlayers}
        </Typography>
        <Button
          variant="contained"
          style={{
            borderRadius: '20px',
            width: { xs: '120px', sm: '140px', md: '150px' },
            height: { xs: '40px', sm: '50px', md: '60px' },
            background: BLUE.main,
          }}
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
          width: { xs: '120px', sm: '140px', md: '150px' },
          height: { xs: '40px', sm: '50px', md: '60px' },
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
