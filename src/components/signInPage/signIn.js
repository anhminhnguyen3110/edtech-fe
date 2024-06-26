import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import styles from './SignIn.module.css'
import { useAuth } from '../../context/authContext'
import { useRouter } from 'next/router'
import withNonAuth from '../../hoc/withNonAuth'
const SignIn = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const API_URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail && !password) {
      setError('Please enter both email and password')
    } else if (!trimmedEmail) {
      setError('Please enter your email')
    } else if (!password) {
      setError('Please enter your password')
    } else {
      setError('')
      setIsLoading(true)

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: trimmedEmail, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          // If the server provides an error message, use it; otherwise, use a default message
          const errorMessage =
            data.message || 'Login failed. Please check your credentials and try again.'
          throw new Error(errorMessage)
        }

        console.log('Login successful:', data)
        // Store tokens in localStorage and update context
        login(data.accessToken, data.refreshToken, data.expiresInMinutes)
      } catch (err) {
        setError(err.message)
        console.error('Login error:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <Box className={styles.background}>
      <Container maxWidth="md" className={styles.container}>
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mr={isMobile ? 0 : 4}
            mb={isMobile ? 2 : 0}
          >
            <Box
              component="img"
              src="/edtech-logo-full.png"
              alt="edtech logo"
              sx={{
                width: isMobile ? '200px' : '300px',
                height: 'auto',
              }}
            />
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            width={isMobile ? '100%' : '300px'}
          >
            {!isMobile && (
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                EdTech Assistant
              </Typography>
            )}
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{
                  mt: 1,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default withNonAuth(SignIn)
