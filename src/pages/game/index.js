/* eslint-disable react-hooks/exhaustive-deps */
// pages/game/index.js
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
import WaitForGame from '@/components/gamePage/waitForGame'

const Game = () => {
  const router = useRouter()
  const { socket, resetSocket } = useHostWebSocket()
  const [loading, setLoading] = useState(true)
  const [gameNotFound, setGameNotFound] = useState(false)
  const [gameState, setGameState] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [playersAnswered, setPlayersAnswered] = useState(0)
  const [gameScoreboard, setGameScoreboard] = useState(null)
  const [finalResult, setFinalResult] = useState(null)
  const [gameStatistics, setGameStatistics] = useState(null)
  const [error, setError] = useState(null)
  const delayTime = 7

  const hasInitializedRef = useRef(false) // Add a ref to track initialization

  if (typeof window !== 'undefined') {
    window.history.pushState(null, document.title, window.location.href)
  }

  const handleGameTermination = () => {
    console.log('gameState', gameState)
    if (socket) {
      socket.off('disconnect')
    }
    resetSocket()
    const gameId = sessionStorage.getItem('gameId')
    if (gameState !== 'END') {
      console.log(gameState)
      console.log('Game termination triggered successfully')
    } else {
    }
    sessionStorage.clear()
  }

  const handleBeforeUnload = (event) => {
    if (gameNotFound || gameState === 'ERROR') return
    event.preventDefault()
    event.returnValue = 'Are you sure you want to leave? Your game will be terminated.'
  }

  const handlePopState = () => {
    if (window.confirm('Are you sure you want to leave? Your game will be terminated.')) {
      handleGameTermination()
    } else {
      window.history.pushState(null, document.title, window.location.href)
    }
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
        setGameState('START')
        setQuiz(JSON.parse(quizData))
      }
      setLoading(false)

      if (socket) {
        socket.emit('HOST_STARTED_GAME', { gameCode: gameCode })

        socket.off('disconnect')
        socket.on('disconnect', () => {
          console.log('Socket disconnected')
          handleGameTermination()
          setGameNotFound(true)
          setError(true)
        })

        socket.on('GAME_END', (data) => {
          console.log('GAME_END', data)
          setFinalResult(data.players)
          // setGameState("SCOREBOARD");
        })

        socket.on('HOST_RECEIVE_QUESTION_DETAIL', (data) => {
          console.log('HOST_RECEIVE_QUESTION_DETAIL', data)
        })
        socket.on('ERROR', (data) => {
          console.log('ERROR', data)
          handleGameTermination()
          setGameNotFound(true)
          setError(true)
        })

        // socket.on('QUESTION_HOST_RESULT', (data) => {
        //   console.log('QUESTION_HOST_RESULT', data)
        // })

        socket.on('QUESTION_HOST_NEXT', (data) => {
          console.log('QUESTION_HOST_NEXT', data)
        })
        // Add event listener for beforeunload
        hasInitializedRef.current = true // Mark as initialized
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleGameTermination) // Handles termination when unloading
    window.addEventListener('popstate', handlePopState)
    return () => {
      if (socket) {
        socket.off('HOST_RECEIVE_QUESTION_DETAIL')
        socket.off('UPDATE_PLAYERS_ANSWERED')
        socket.off('QUESTION_HOST_RESULT')
        socket.off('QUESTION_HOST_NEXT')
      }
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', handleGameTermination)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [socket])

  const handleQuizClick = () => {
    router.push('/quiz')
  }

  const handleStartGame = () => {
    console.log('Start Game')
    setGameState('READY')
  }

  const handleEndQuestion = () => {
    console.log('End Question')
    socket.emit('QUESTION_END', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex,
    })
  }

  const handleMovetoScoreboard = () => {
    console.log('Move to Scoreboard')
    setGameState('SCOREBOARD')
    setPlayersAnswered(0)
  }

  const handleNextQuestion = () => {
    console.log('Next Question')
    setQuestionIndex((prev) => prev + 1)
    setPlayersAnswered(0)
    console.log('Question Index', questionIndex)
    socket.emit('PROCEED_TO_NEXT_QUESTION', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex + 1,
    })
    if (questionIndex === quiz.questions.length - 1) {
      socket.emit('HOST_GET_QUESTION', {
        gameCode: sessionStorage.getItem('gameCode'),
        questionIndexInQuiz: questionIndex + 1,
        delayTimeInSeconds: delayTime,
      })
      socket.on('GAME_END', (data) => {
        console.log('GAME_END', data)
        setGameState('END')
      })
    } else {
      setGameState('READY')
    }
  }

  const handleSwitchPlaying = () => {
    setGameState('PLAYING')
  }

  const handleSendQuestion = () => {
    console.log('Send Question')
    socket.emit('HOST_GET_QUESTION', {
      gameCode: sessionStorage.getItem('gameCode'),
      questionIndexInQuiz: questionIndex,
      delayTimeInSeconds: delayTime,
    })
    console.log('Question Index', questionIndex)
    if (questionIndex === 0) {
      socket.on('QUESTION_HOST_RESULT', (data) => {
        setGameStatistics(data.questionStatistic)
      })
      socket.on('UPDATE_PLAYERS_ANSWERED', (data) => {
        console.log('UPDATE_PLAYERS_ANSWERED', data)
        setPlayersAnswered((prev) => prev + 1) // Increment playersAnswered
      })
      socket.on('QUIZ_HOST_RANK', (data) => {
        console.log('QUIZ_HOST_RANK', data)
        setGameScoreboard(data)
        console.log('Scoreboard', data)
      })
    }
  }

  const handleReturnToLobby = () => {
    setGameNotFound(true)
    resetSocket()
    sessionStorage.clear()
    router.push('/quiz')
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
        <GameNotFound
          message={error ? 'Encounter Error!' : 'Game not found or invalid game data.'}
        />
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
      {gameState === 'START' && <Ready quiz={quiz} handleStart={handleStartGame} />}
      {gameState === 'READY' && (
        <WaitForGame
          question={quiz.questions[questionIndex]}
          startGetQuestions={handleSendQuestion}
          moveToQuestion={handleSwitchPlaying}
          delayTime={delayTime}
        />
      )}
      {gameState === 'PLAYING' && (
        <Playing
          question={quiz.questions[questionIndex]}
          playersAnswered={playersAnswered}
          handleEndQuestion={handleEndQuestion}
          handleMovetoScoreboard={handleMovetoScoreboard}
          questionStatistics={gameStatistics}
        />
      )}
      {gameState === 'SCOREBOARD' && gameScoreboard !== null && (
        <GameScoreboard result={gameScoreboard} handleNext={handleNextQuestion} />
      )}
      {gameState === 'END' && (
        <FinalScoreBoard
          scoreboard={gameScoreboard}
          quizName={quiz.name}
          onReturn={handleReturnToLobby}
        />
      )}
    </Box>
  )
}

export default withAuth(Game)
