import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Tab,
  Grid,
  Tabs,
} from '@mui/material'
import { useAuth } from '../../context/authContext'
import withNonAuth from '../../hoc/withNonAuth'
import { BLUE } from '@/theme/palette'

const CombinedAuth = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const API_URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const { login, isAuthenticated } = useAuth()
  const [information, setInformation] = useState('')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail || !password) {
      setError('Please enter both email and password')
      return
    }
    if (activeTab === 1 && !name) {
      setError('Please enter name')
      return
    }

    if (activeTab === 1 && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const endpoint = activeTab === 0 ? 'login' : 'register'
      let body
      if (activeTab === 0) {
        body = JSON.stringify({ email: trimmedEmail, password })
      } else {
        body = JSON.stringify({
          email: trimmedEmail,
          password: password,
          confirmPassword: confirmPassword,
          name: name,
          role: 'TEACHER',
        })
      }
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || `${activeTab === 0 ? 'Login' : 'Signup'} failed. Please try again.`
        )
      }

      console.log(`${activeTab === 0 ? 'Login' : 'Signup'} successful:`, data)
      if (activeTab === 0) {
        login(data.accessToken, data.refreshToken, data.expiresInMinutes)
      } else {
        setInformation('Please check your email to activate the account')
      }
    } catch (err) {
      setError(err.message)
      console.error(`${activeTab === 0 ? 'Login' : 'Signup'} error:`, err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(bg-signin.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: isMobile ? '80%' : '100%',
          textAlign: isMobile ? 'center' : 'left',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Box
                component="img"
                src="/edtech-logo-full.png"
                alt="edtech logo"
                sx={{
                  width: '100%',
                  maxWidth: isMobile ? '150px' : '300px',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              display="flex"
              flexDirection="column"
              width="100%"
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                EdTech Assistant
              </Typography>
              <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {activeTab === 1 && (
                <TextField
                  label="name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              )}
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
              {activeTab === 1 && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              )}
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
              {information && (
                <Typography
                  // color="info"
                  variant="body2"
                  sx={{
                    mt: 1,
                    textAlign: 'center',
                    width: '100%',
                    color: BLUE.main,
                  }}
                >
                  {information}
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
                {isLoading ? 'Processing...' : activeTab === 0 ? 'Sign In' : 'Sign Up'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default withNonAuth(CombinedAuth)
