import React from 'react'
import { Container, Typography, Box, Stack, Grid, CardContent, Card } from '@mui/material'
import Image from 'next/image'
import welcomeImage from '../../../public/edtech-getty-removebg.webp' // Adjust the path according to your project structure

const services = [
  {
    title: 'Advanced Error Detection in Student Work',
    description:
      'Employ Large Language Models (LLMs) to automatically identify and correct critical errors in student submissions, ensuring precise, effective feedback that drives improved learning outcomes.',
    imageUrl: '/issue.png', // Placeholder for image
  },
  {
    title: 'Dynamic Lesson Creation',
    description:
      "Empower educators with LLM-driven technology that generates Python code and automated testing tools, enabling the creation of highly engaging, personalised lessons suitable to all student's unique learning journey.",
    imageUrl: '/lesson.png', // Placeholder for image
  },
  {
    title: 'Custom Online Quizzes and Interactive Game Sessions',
    description:
      'Enhance learning engagement with LLM-powered, self-hosted quizzes and interactive games. Our solution delivers appropriate educational experiences that captivate students and reinforce key concepts. Most importantly, it is funs!',
    imageUrl: '/quiz.png', // Placeholder for image
  },
  {
    title: 'Intelligent Educational Chat Solution',
    description:
      'Elevate teachers with a robust LLM-driven chat application designed specifically for the educational domain. Featuring a Retrieval-Augmented Generation (RAG) system and integrated Google web search capabilities, this tool provides comprehensive, on-demand support across both educational content and general knowledge topics.',
    imageUrl: '/chat.png', // Placeholder for image
  },
]

const LandingBody = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#FEE1D9',
          minHeight: '95vh',
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
                sx={{
                  fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                  fontWeight: 400,
                }}
              >
                Welcome to
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' },
                  fontWeight: 300,
                }}
              >
                EdTech Assistant
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' },
                  fontWeight: 200,
                }}
              >
                Revolutionise your classroom with EdTech Assistant, the all-in-one platform designed
                to empower educators and enhance student learning. Our innovative app leverages
                cutting-edge technology to streamline your teaching process and create engaging
                educational experiences.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1, marginLeft: '30px' }}>
              <Image
                src={welcomeImage}
                alt="Welcome Image"
                width={700}
                height={700}
                style={{
                  width: '100%',
                  // maxWidth: '700px',
                  height: 'auto',
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ padding: '4rem 0' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, marginBottom: '2rem', fontSize: '3.5rem' }}
          >
            Services
          </Typography>
          <Grid container spacing={1.5}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ textAlign: 'center', padding: '2rem', boxShadow: 'none' }}>
                  <CardContent>
                    <Box
                      sx={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        margin: '0 auto 1rem', // Center the image and add bottom margin
                        display: 'flex', // Flexbox to center the image
                        alignItems: 'center', // Center vertically
                        justifyContent: 'center', // Center horizontally
                      }}
                    >
                      <Image
                        src={service.imageUrl} // Placeholder for image
                        alt={service.title}
                        width={200}
                        height={200}
                        style={{
                          width: 'auto', // Maintain aspect ratio
                          height: 'auto', // Maintain aspect ratio
                          maxWidth: '70%', // Adjust this value to make the image smaller
                          maxHeight: '70%', // Adjust this value to make the image smaller
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontSize: '1.5rem', // Adjust the size as needed
                        fontWeight: 'bold', // Make the text bold
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', fontSize: '1.25rem', textAlign: 'justify' }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingBody
