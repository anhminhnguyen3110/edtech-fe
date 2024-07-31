import React from 'react'
import { Box, Container, Paper, Typography } from '@mui/material'
import { BLUE } from '@/theme/palette'
const WaitResult = () => {
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
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color={BLUE.darker}
            fontWeight="bold"
          >
            Your answer has been submitted!
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default WaitResult
