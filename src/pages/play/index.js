import React, { useEffect, useCallback, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { BLUE } from '@/theme/palette'
import { useRouter } from 'next/router'
import { usePlayerWebSocket } from '@/context/playerWebSocketProvider'
import Ready from '@/components/playPage/ready'
import Answer from '@/components/playPage/answer'
import WaitResult from '@/components/playPage/waitResult'
import Result from '@/components/playPage/result'
import End from '@/components/playPage/end'

const Play = () => {
  const [hasGame, setHasGame] = useState(true)
  const [gameStatus, setGameStatus] = useState(false)
  const [hostDisconnected, setHostDisconnected] = useState(false)
  const [gameState, setGameState] = useState('')
  const router = useRouter()
  const { socket, resetSocket } = usePlayerWebSocket()
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [playerResult, setPlayerResult] = useState(null)
  const [playerRank, setPlayerRank] = useState(null)

  useEffect(() => {
    const storedNickName = sessionStorage.getItem('nickname')
    const gameCode = sessionStorage.getItem('gameCode')
    const playerId = sessionStorage.getItem('playerId')
    const gameStatusStorage = sessionStorage.getItem('gameStatus')

    if (!storedNickName || !gameCode || !playerId) {
      setHasGame(false)
    } else {
      if (gameStatusStorage === 'STARTED') {
        setGameState('WAITING')
      }
      setGameStatus(true)
    }
  }, [])

  useEffect(() => {
    if (!socket || !gameStatus) return

    const handleHostDisconnected = (data) => {
      console.log('Host disconnected', data)
      setHostDisconnected(true)
    }

    const handleGameNotFound = (data) => {
      console.log('GAME_NOT_FOUND', data)
    }

    const handlePlayerNotFound = (data) => {
      console.log('PLAYER_NOT_FOUND', data)
    }

    const handleAnswerSubmittedSuccessfully = (data) => {
      console.log(`Player submitted answer successfully:`, data)
      setGameState('WAIT_RESULT')
    }

    const handleError = (data) => {
      console.log('ERROR', data)
    }

    const handlePlayerReceiveQuestionOptions = (data) => {
      console.log('PLAYER_RECEIVE_QUESTION_OPTIONS', data)
      setGameState('PLAYING')
      setCurrentQuestion(data)
    }

    const handlePlayerReceiveResult = (data) => {
      console.log('QUESTION_PLAYER_RESULT', data)
      const player = data.filter(
        (player) => player.playerId === parseInt(sessionStorage.getItem('playerId'))
      )[0]
      console.log('Player result:', player)
      setPlayerResult(player)
      setGameState('RESULT')
    }

    console.log('Adding event listeners')

    socket.on('HOST_DISCONNECTED', handleHostDisconnected)
    socket.on('GAME_NOT_FOUND', handleGameNotFound)
    socket.on('PLAYER_NOT_FOUND', handlePlayerNotFound)
    socket.on('ANSWER_SUBMITTED_SUCCESSFULLY', handleAnswerSubmittedSuccessfully)
    socket.on('ERROR', handleError)
    socket.on('PLAYER_RECEIVE_QUESTION_OPTIONS', handlePlayerReceiveQuestionOptions)
    socket.on('QUESTION_PLAYER_RESULT', handlePlayerReceiveResult)
    socket.on('GAME_END', (data) => {
      console.log('GAME_END', data)
      console.log('Player ID:', sessionStorage.getItem('playerId'))
      // const player = data.players.filter(player => player.playerId === parseInt(sessionStorage.getItem('playerId')))[0];
      // const playerInformation = {
      //   score: player.score,
      //   rank: player.rank
      // }
      // setPlayerRank(playerInformation);
      setGameState('END')
    })

    return () => {
      socket.off('HOST_DISCONNECTED', handleHostDisconnected)
      socket.off('GAME_NOT_FOUND', handleGameNotFound)
      socket.off('PLAYER_NOT_FOUND', handlePlayerNotFound)
      socket.off('ANSWER_SUBMITTED_SUCCESSFULLY', handleAnswerSubmittedSuccessfully)
      socket.off('ERROR', handleError)
      socket.off('PLAYER_RECEIVE_QUESTION_OPTIONS', handlePlayerReceiveQuestionOptions)
    }
  }, [socket, gameStatus])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
      if (socket) {
        socket.disconnect()
      }
      sessionStorage.clear()
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [socket])

  const handleJoinClick = useCallback(() => {
    sessionStorage.clear()
    resetSocket()
    router.push('/join')
  }, [router, resetSocket])

  const handleAnswerClick = (answer) => {
    const payload = {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: currentQuestion.questionIndexInQuiz,
      answer: answer,
    }
    console.log('Emitting ANSWER_SUBMITTED with payload:', payload)
    socket.emit('ANSWER_SUBMITTED', payload)
  }

  const handleTimesUp = () => {
    setGameState('WAIT_RESULT')
  }

  const renderDisconnected = () => (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: 'center', color: 'white', fontSize: '3rem', mb: 2 }}
      >
        Host disconnected! Game ends!
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'white',
          color: BLUE.main,
          '&:hover': { backgroundColor: 'lightgray' },
        }}
        onClick={handleJoinClick}
      >
        Go to Join
      </Button>
    </>
  )

  const renderNoGame = () => (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: 'center', color: 'white', fontSize: '3rem', mb: 2 }}
      >
        No game found
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'white',
          color: BLUE.main,
          '&:hover': { backgroundColor: 'lightgray' },
        }}
        onClick={handleJoinClick}
      >
        Go to Join
      </Button>
    </>
  )

  const renderGameContent = () => (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
      {gameState === 'WAITING' && <Ready />}
      {gameState === 'PLAYING' && (
        <Answer
          question={currentQuestion}
          answerQuestion={handleAnswerClick}
          handleTimesUp={handleTimesUp}
        />
      )}
      {gameState === 'WAIT_RESULT' && <WaitResult />}
      {gameState === 'RESULT' && <Result result={playerResult} />}
      {gameState === 'END' && <End player={playerResult} />}
    </Box>
  )

  return (
    <Box
      sx={{
        height: '100vh',
        background: gameState !== 'RESULT' ? BLUE.main : '',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {hostDisconnected ? renderDisconnected() : hasGame ? renderGameContent() : renderNoGame()}
    </Box>
  )
}

export default Play
