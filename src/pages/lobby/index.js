/* eslint-disable react-hooks/exhaustive-deps */
// pages/lobby.js
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import withAuth from '@/hoc/withAuth'
import PlayerList from '@/components/lobbyPage/playerList'
import GameCodeDisplay from '@/components/lobbyPage/gameCodeDisplay'
import LobbyActions from '@/components/lobbyPage/lobbyAction'
import Loading from '@/components/lobbyPage/loading'
import GameNotFound from '@/components/lobbyPage/gameNotFound'
import useGameStatus from '@/hooks/useGameStatus'
import { useHostWebSocket } from '@/context/hostWebSocketProvider'
import api from '@/lib/api'
import { BLUE } from '@/theme/palette'

const Lobby = () => {
  const router = useRouter()
  const { socket, resetSocket } = useHostWebSocket()
  const [players, setPlayers] = useState([])
  const { gameCode, gameId } = router.query
  const { gameStatus, setGameStatus } = useGameStatus(gameCode, gameId)
  const isNavigatingToGame = useRef(false)

  const handleBeforeUnload = (event) => {
    if (!isNavigatingToGame.current) {
      event.preventDefault()
      event.returnValue = 'Are you sure you want to leave? Your game will be terminated.'
    }
  }

  const handleUnloadConfirmed = () => {
    resetSocket()
    api
      .patch(`/games/${gameId}`, { gameStatus: 'TERMINATED' }, { authRequired: true })
      .then(() => {
        console.log('Game terminated successfully')
      })
      .catch((e) => {
        console.log('Error terminating game:', e)
      })
    sessionStorage.clear()
  }

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      isNavigatingToGame.current = url === '/game'
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router])

  useEffect(() => {
    if (!socket) return
    const unloadCallback = () => {
      if (!isNavigatingToGame.current) {
        handleUnloadConfirmed()
      }
    }

    socket.off('disconnect')
    socket.on('disconnect', () => {
      console.log('Socket disconnected')
      setGameStatus({ status: 'DISCONNECTED', message: 'Game get disconnected', gameCode: null })
    })

    const updatePlayers = (data) => {
      console.log('Players in lobby:', data)
      setPlayers(data.players)
    }

    const playerDisconnected = (playerId) => {
      console.log('Player disconnected:', playerId)
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.playerId !== playerId))
    }

    const hostJoinedSuccessfully = () => {
      console.log('Host joined successfully')
    }

    const gameNotFound = (data) => {
      console.log('Game not found', data)
      setGameStatus({ status: 'NOT_FOUND', message: 'Game not found', gameCode: null })
    }

    socket.on('UPDATE_PLAYERS_IN_LOBBY', updatePlayers)
    socket.on('PLAYER_DISCONNECTED', playerDisconnected)
    socket.on('HOST_JOINED_SUCCESSFULLY', hostJoinedSuccessfully)
    socket.on('GAME_NOT_FOUND', gameNotFound)

    if (gameStatus.status === 'ACTIVE' && gameStatus.gameCode) {
      console.log('Emitting HOST_JOINED event with game code:', gameStatus.gameCode)
      socket.emit('HOST_JOINED', { gameCode: gameStatus.gameCode })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', unloadCallback)

    return () => {
      socket.off('UPDATE_PLAYERS_IN_LOBBY', updatePlayers)
      socket.off('PLAYER_DISCONNECTED', playerDisconnected)
      socket.off('HOST_JOINED_SUCCESSFULLY', hostJoinedSuccessfully)
      socket.off('GAME_NOT_FOUND', gameNotFound)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', unloadCallback)
    }
  }, [socket, gameStatus.status, gameStatus.gameCode, setGameStatus])

  const getFontSize = (numPlayers) => {
    if (numPlayers <= 6) return '4rem'
    if (numPlayers <= 10) return '2.5rem'
    return '3rem'
  }

  const getSpacing = (numPlayers) => {
    if (numPlayers <= 6) return 3
    if (numPlayers <= 10) return 4
    if (numPlayers <= 30) return 2
    return 5
  }

  const fontSize = getFontSize(players.length)
  const spacing = getSpacing(players.length)

  const handleNext = () => {
    // socket.emit('HOST_STARTED_GAME', { gameCode: gameCode });
    router.push(`/game`)
  }

  const handleQuizClick = () => {
    router.push('/quiz')
  }

  if (gameStatus.status === null) {
    return <Loading />
  }

  if (gameStatus.status !== 'ACTIVE') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        p={3}
        sx={{ paddingTop: '5rem', paddingLeft: '0rem', paddingRight: '0rem' }}
      >
        <GameNotFound message={gameStatus.message} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: BLUE.main,
            '&:hover': {
              backgroundColor: BLUE.dark,
            },
          }}
          onClick={handleQuizClick}
        >
          Go Back
        </Button>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      p={3}
      sx={{ paddingTop: '5rem', paddingLeft: '0rem', paddingRight: '0rem' }}
    >
      <Typography variant="h2" gutterBottom>
        Game code
      </Typography>
      <GameCodeDisplay gameCode={gameCode} />
      <Box maxWidth="80%" mb={2} sx={{ overflow: 'hidden' }}>
        <PlayerList players={players} fontSize={fontSize} spacing={spacing} />
      </Box>
      <LobbyActions numPlayers={players.length} onNextClick={handleNext} />
    </Box>
  )
}

export default withAuth(Lobby)
