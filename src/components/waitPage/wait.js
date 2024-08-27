/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { BLUE } from '@/theme/palette'
import { useRouter } from 'next/router'
import { usePlayerWebSocket } from '@/context/playerWebSocketProvider'

const Wait = () => {
  const [nickName, setNickName] = useState('Guest')
  const [hasGame, setHasGame] = useState(true)
  const [gameStatus, setGameStatus] = useState(false)
  const [hostDisconnected, setHostDisconnected] = useState(false)
  const router = useRouter()
  const { socket, resetSocket } = usePlayerWebSocket()

  useEffect(() => {
    const storedNickName = sessionStorage.getItem('nickname')
    const gameCode = sessionStorage.getItem('gameCode')
    const playerId = sessionStorage.getItem('playerId')

    if (!storedNickName || !gameCode || !playerId) {
      setHasGame(false)
    } else {
      setNickName(storedNickName)
      setGameStatus(true)
    }
  }, [])

  useEffect(() => {
    if (!socket || !gameStatus) return

    const handleHostDisconnected = (data) => {
      console.log('Host disconnected', data)
      setHostDisconnected(true)
    }

    socket.off('disconnect')
    socket.on('disconnect', () => {
      setHostDisconnected(true)
    })
    socket.on('HOST_DISCONNECTED', handleHostDisconnected)

    socket.on('GAME_HAS_STARTED', (data) => {
      sessionStorage.setItem('gameStatus', 'STARTED')
      console.log('Game has started', data)
      router.push('/play')
    })

    return () => {
      // socket.off('HOST_DISCONNECTED', handleHostDisconnected);
    }
  }, [socket, gameStatus])

  const handleJoinClick = () => {
    sessionStorage.clear()
    resetSocket()
    router.push('/join')
  }

  return (
    <Box
      sx={{
        height: '100vh',
        background: BLUE.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {hostDisconnected ? (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: 'center',
              color: 'white',
              fontSize: '3rem',
              mb: 2,
            }}
          >
            Host disconnected! Game ends!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: BLUE.main,
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
            onClick={handleJoinClick}
          >
            Go to Join
          </Button>
        </>
      ) : hasGame ? (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: 'center',
              color: 'white',
              fontSize: '3rem',
            }}
          >
            Seeing your name on the screen?
          </Typography>

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              p: 2,
              color: 'white',
              fontSize: '2.5rem',
              borderRadius: '4px',
            }}
          >
            {nickName}
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: 'center',
              color: 'white',
              fontSize: '3rem',
              mb: 2,
            }}
          >
            No game found
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: BLUE.main,
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
            onClick={handleJoinClick}
          >
            Go to Join
          </Button>
        </>
      )}
    </Box>
  )
}

export default Wait
