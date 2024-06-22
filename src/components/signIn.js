import React from 'react'
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

const SignIn = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
              className={styles.logo}
            />
          </Box>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            width={isMobile ? '100%' : '300px'}
          >
            {!isMobile && (
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                EdTech Assistant
              </Typography>
            )}
            <TextField label="Username" variant="outlined" margin="normal" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SignIn
