/* eslint-disable react-hooks/exhaustive-deps */
// pages/lobby.js
import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import withAuth from '@/hoc/withAuth'
import Loading from '@/components/lobbyPage/loading'
import GameNotFound from '@/components/lobbyPage/gameNotFound'
import { useHostWebSocket } from '@/context/hostWebSocketProvider'
import api from '@/lib/api'
import { BLUE } from '@/theme/palette'
import Ready from '@/components/gamePage/ready'
import Playing from '@/components/gamePage/playing'
import GameScoreboard from '@/components/gamePage/gameScoreboard'
import FinalScoreBoard from '@/components/gamePage/finalScoreBoard'

const Game = () => {
  const router = useRouter()
  const socket = useHostWebSocket()
  const [loading, setLoading] = useState(true)
  const [gameNotFound, setGameNotFound] = useState(false)
  const [gameState, setGameState] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [playersAnswered, setPlayersAnswered] = useState(0)
  const [gameScoreboard, setGameScoreboard] = useState(null)
  const [finalResult, setFinalResult] = useState(null)

  const hasInitializedRef = useRef(false) // Add a ref to track initialization

  const handleBeforeUnload = (event) => {
    if (gameNotFound) return
    event.preventDefault()
    event.returnValue = 'Are you sure you want to leave? Your game will be terminated.'
    // Update the game status to terminated
    api
      .patch(
        `/games/${sessionStorage.getItem('gameId')}`,
        { gameStatus: 'TERMINATED' },
        { authRequired: true }
      )
      .then(() => {
        console.log('Game terminated successfully')
      })
      .catch((e) => {
        console.log('Error terminating game:', e)
      })
    sessionStorage.clear()
  }

  useEffect(() => {
    console.log('Game useEffect')

    if (!hasInitializedRef.current) {
      // Check if already initialized
      console.log('Game useEffect - not initialized')
      const gameCode = sessionStorage.getItem('gameCode')
      const gameId = sessionStorage.getItem('gameId')
      const quizData = sessionStorage.getItem('quizData')

      if (!gameCode || !quizData || !gameId) {
        setGameNotFound(true)
      } else {
        setGameNotFound(false)
        setGameState('READY')
        setQuiz(JSON.parse(quizData))
      }
      setLoading(false)

      if (socket) {
        socket.emit('HOST_STARTED_GAME', { gameCode: gameCode })

        socket.on('GAME_END', (data) => {
          console.log('GAME_END', data)
          setFinalResult(data.players)
          // setGameState("SCOREBOARD");
        })

        socket.on('HOST_RECEIVE_QUESTION_DETAIL', (data) => {
          console.log('HOST_RECEIVE_QUESTION_DETAIL', data)
        })

        socket.on('QUESTION_HOST_RESULT', (data) => {
          console.log('QUESTION_HOST_RESULT', data)
        })

        socket.on('QUESTION_HOST_NEXT', (data) => {
          console.log('QUESTION_HOST_NEXT', data)
        })

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload)

        hasInitializedRef.current = true // Mark as initialized
      }

      return () => {
        if (socket) {
          socket.off('HOST_RECEIVE_QUESTION_DETAIL')
          socket.off('UPDATE_PLAYERS_ANSWERED')
          socket.off('QUESTION_HOST_RESULT')
          socket.off('QUESTION_HOST_NEXT')
        }
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [socket])

  const handleQuizClick = () => {
    router.push('/quiz')
  }

  const handleStartGame = () => {
    console.log('Start Game')
    socket.emit('HOST_GET_QUESTION', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex,
    })
    socket.on('UPDATE_PLAYERS_ANSWERED', (data) => {
      console.log('UPDATE_PLAYERS_ANSWERED', data)
      setPlayersAnswered((prev) => prev + 1) // Increment playersAnswered
    })
    setGameState('PLAYING')
  }

  const handleEndQuestion = () => {
    console.log('Next Question')
    socket.emit('QUESTION_END', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex,
    })
    socket.on('QUIZ_HOST_RANK', (data) => {
      console.log('QUIZ_HOST_RANK', data)
      setGameScoreboard(data)
      console.log('Scoreboard', data)
      setGameState('SCOREBOARD')
      setPlayersAnswered(0)
    })
  }

  const handleNextQuestion = () => {
    console.log('Next Question')
    setQuestionIndex((prev) => prev + 1)
    setPlayersAnswered(0)
    socket.emit('HOST_GET_QUESTION', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex + 1,
    })
    console.log('Question Index', questionIndex)
    if (questionIndex === quiz.questions.length - 1) {
      socket.on('GAME_END', (data) => {
        console.log('GAME_END', data)
        setGameState('END')
      })
    } else {
      setGameState('PLAYING')
    }
  }

  if (loading) {
    return <Loading />
  }

  if (gameNotFound) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        p={3}
        sx={{ paddingTop: '5rem', paddingLeft: '0rem', paddingRight: '0rem' }}
      >
        <GameNotFound message="Game not found or invalid game data." />
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
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
      {/* Render your main game content here */}
      {gameState === 'READY' && <Ready quiz={quiz} handleStart={handleStartGame} />}
      {gameState === 'PLAYING' && (
        <Playing
          question={quiz.questions[questionIndex]}
          playersAnswered={playersAnswered}
          handleEndQuestion={handleEndQuestion}
        />
      )}
      {gameState === 'SCOREBOARD' && gameScoreboard !== null && (
        <GameScoreboard result={gameScoreboard} handleNext={handleNextQuestion} />
      )}
      {gameState === 'END' && <FinalScoreBoard scoreboard={gameScoreboard} quizName={quiz.name} />}
    </Box>
  )
}

export default withAuth(Game)
