import React from 'react'
import { Container, Typography, Box, Stack } from '@mui/material'
import Image from 'next/image'
import welcomeImage from '../../public/study.png' // Adjust the path according to your project structure

const LandingBody = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FEE1D9',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: { xs: '2rem 1rem', md: '2rem 0' },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              flex: 1,
              paddingRight: { xs: 0, md: '2rem' }, // Add padding on the right to move text to the left
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontSize: { xs: '2rem', md: '3rem', lg: '4rem' }, fontWeight: 400 }}
            >
              Welcome to
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' }, fontWeight: 300 }}
            >
              Intelligent EdTech Assistant
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' }, fontWeight: 200 }}
            >
              Experience the future of education. Our platform empowers students and educators with
              cutting-edge tools to enhance learning and teaching. Dive in and discover a world of
              interactive, personalized educational experiences.
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Image
              src={welcomeImage}
              alt="Welcome Image"
              width={500}
              height={500}
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default LandingBody
