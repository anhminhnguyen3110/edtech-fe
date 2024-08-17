import React from 'react'
import Link from 'next/link'
import { Container, Box, Typography, Button, Grid } from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex', // Changed from 'grid' to 'flex'
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
        height: '100vh', // Full viewport height
        backgroundColor: 'white',
        px: { xs: 3, lg: 8 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            margin: 0,
            fontWeight: 'bold',
            color: GRAY.darker, // Set the color to gray
            fontSize: { xs: '5rem', sm: '10rem' }, // Big 404 text
            letterSpacing: { xs: '0.2rem', sm: '0.8rem' }, // Add space between characters
          }}
        >
          404
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            margin: 0,
            mt: 2,
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: { xs: '2.5rem', sm: '4rem' }, // Increased font size
          }}
        >
          Page not found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            margin: 0,
            mt: 2,
            color: 'text.secondary',
            fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Increased font size
          }}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="/"
              sx={{ textTransform: 'none', backgroundColor: BLUE.main, fontSize: '1.5rem' }}
            >
              Go back home
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default NotFound
