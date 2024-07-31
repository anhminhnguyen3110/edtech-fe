import { useState, useEffect } from 'react'
import api from '@/lib/api'

const useGameStatus = (gameCode, gameId) => {
  const [gameStatus, setGameStatus] = useState({ status: null, message: '', gameCode: null })

  useEffect(() => {
    const checkGameStatus = async () => {
      if (!gameCode || !gameId) {
        setGameStatus({ status: 'NOT_FOUND', message: 'Game not found', gameCode: null })
        return
      }
      if (gameCode && gameId) {
        try {
          const response = await api.get(`/games/${gameId}`, { authRequired: true })
          console.log('Game status response:', response.data)
          const { gameCode: responseGameCode, status } = response.data
          if (responseGameCode === gameCode) {
            if (status === 'ACTIVE') {
              setGameStatus({ status: 'ACTIVE', message: '', gameCode })
            } else if (status === 'TERMINATED') {
              setGameStatus({
                status: 'TERMINATED',
                message: 'This game has been terminated.',
                gameCode: null,
              })
            } else if (status === 'COMPLETE') {
              setGameStatus({
                status: 'COMPLETE',
                message: 'This game has been completed.',
                gameCode: null,
              })
            } else {
              setGameStatus({ status: 'NOT_FOUND', message: 'Game not found', gameCode: null })
            }

            if (status === 'ACTIVE') {
              try {
                const quizData = await api.get(`/quizzes/detail/${response.data.quizId}`, {
                  authRequired: true,
                })
                console.log('Quiz data:', quizData.data)
                sessionStorage.setItem('quizData', JSON.stringify(quizData.data))
                sessionStorage.setItem('gameCode', gameCode)
                sessionStorage.setItem('gameId', gameId)
              } catch (error) {
                console.error('Failed to fetch game questions:', error)
              }
            }
          } else {
            setGameStatus({ status: 'NOT_FOUND', message: 'Game not found', gameCode: null })
          }
        } catch (error) {
          setGameStatus({ status: 'NOT_FOUND', message: 'Game not found', gameCode: null })
        }
      }
    }

    checkGameStatus()
  }, [gameCode, gameId])

  return { gameStatus, setGameStatus }
}

export default useGameStatus
