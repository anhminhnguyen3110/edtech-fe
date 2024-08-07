import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { BLUE } from '@/theme/palette'
import { useRouter } from 'next/router'
import { usePlayerWebSocket } from '@/context/playerWebSocketProvider'

const customTextFieldStyle = {
  marginBottom: '10px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid',
      borderColor: BLUE.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '2px solid',
      borderColor: BLUE.main,
    },
  },
}

const JoinPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { socket } = usePlayerWebSocket()
  const [nickname, setNickname] = useState('')
  const [gamePin, setGamePin] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!socket) return

    socket.on('PLAYER_JOINED_SUCCESSFULLY', (data) => {
      console.log('Player joined successfully ', data)
      sessionStorage.setItem('playerId', data.playerId)
      sessionStorage.setItem('gameCode', data.gameCode)
      sessionStorage.setItem('nickname', data.nickname)
      router.push('/wait')
    })

    socket.on('GAME_NOT_FOUND', (data) => {
      console.log('Game not found', data)
      setError(data.message)
    })

    socket.on('GAME_HAS_STARTED', (data) => {
      console.log('Game already started', data)
      setError(data.message)
    })

    socket.on('HOST_NOT_JOIN_YET', (data) => {
      console.log('HOST_NOT_JOIN_YET', data)
      setError(data.message)
    })

    socket.on('GAME_ALREADY_FULL', (data) => {
      console.log('GAME_ALREADY_FULL', data)
      setError(data.message)
    })

    socket.on('PLAYER_NICKNAME_TAKEN', (data) => {
      console.log('PLAYER_NICKNAME_TAKEN', data)
      setError(data.message)
    })

    socket.on('GAME_NOT_STARTED', (data) => {
      console.log('Game not started', data)
      setError(data.message)
    })

    socket.on('HOST_DISCONNECTED', (data) => {
      console.log('HOST_DISCONNECTED ', data)
      setError(data.message)
    })

    return () => {
      socket.off('PLAYER_JOINED_SUCCESSFULLY')
      socket.off('GAME_NOT_FOUND')
      socket.off('GAME_HAS_STARTED')
      socket.off('HOST_NOT_JOIN_YET')
      socket.off('GAME_ALREADY_FULL')
      socket.off('PLAYER_NICKNAME_TAKEN')
      socket.off('GAME_NOT_STARTED')
      socket.off('HOST_DISCONNECTED')
    }
  }, [socket, router])

  const handleJoinClick = () => {
    if (!nickname || !gamePin) {
      setError('Nickname and Game Pin are required.')
      return
    }
    if (!/^\d+$/.test(gamePin)) {
      setError('Game Pin must be a number.')
      return
    }
    setError('')
    // Perform the join action
    console.log('Joining with', { nickname, gamePin })
    if (socket) {
      console.log(socket)
      socket.emit('PLAYER_JOINED', {
        nickname: nickname,
        gameCode: gamePin,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(./bg-signin.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          width: '30rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/edtech-logo-full.png"
          alt="edtech logo"
          sx={{
            width: isMobile ? '150px' : '100px',
            height: 'auto',
          }}
        />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            textAlign: 'center',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}
        >
          Enter your quiz code
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        <Box sx={{ width: '15rem' }}>
          <TextField
            variant="outlined"
            placeholder="Nickname"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: '#e6f2ff',
                '& input': { textAlign: 'center' },
              },
            }}
            sx={customTextFieldStyle}
          />
          <TextField
            variant="outlined"
            placeholder="Game Pin"
            fullWidth
            value={gamePin}
            onChange={(e) => setGamePin(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: '#e6f2ff',
                '& input': { textAlign: 'center' },
              },
            }}
            sx={customTextFieldStyle}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleJoinClick}
            sx={{
              backgroundColor: BLUE.main,
              marginBottom: '10px',
              '&:hover': {
                backgroundColor: BLUE.dark,
              },
            }}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default JoinPage
