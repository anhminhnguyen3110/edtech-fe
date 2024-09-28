/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, IconButton, Link, CircularProgress } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import api from '@/lib/api'
import { useRouter } from 'next/router'
import MessageBox from '@/components/box/messageBox'
import HistoryList from './historyList'

const QuizDashboardPage = () => {
  const [quizName, setQuizName] = useState('Quiz Dashboard')
  const [gameHistory, setGameHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const router = useRouter()
  const [quiz, setQuiz] = useState(null)
  const id = router.query.id

  const itemsPerPage = 5 // Items per page
  const [page, setPage] = useState(1)

  const fetchQuizQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(`/quizzes/detail/${id}`, { authRequired: true })
      setQuiz(response.data)
      setQuizName(response.data.name)
    } catch (err) {
      setError('Error while fetching quiz data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchQuizQuestions()
    }
  }, [id])

  const fetchGameHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/games', {
        params: {
          quizId: id,
          limit: itemsPerPage,
          page: page,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
        },
        authRequired: true,
      })

      const { items, meta } = response.data
      setGameHistory((prevHistory) => {
        const combinedHistory = [...prevHistory, ...items]
        const uniqueHistory = Array.from(
          new Map(combinedHistory.map((item) => [item.id, item])).values()
        )
        return uniqueHistory
      })
      if (page >= meta.totalPages) {
        setHasMore(false) // No more pages to load
      }
    } catch (err) {
      setError('Error while fetching game history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchGameHistory()
    }
  }, [id, page])

  const lastGameElementRef = useRef()
  const loadMoreGames = (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    if (loading) return
    const currentObserver = observer.current
    const lastElement = lastGameElementRef.current

    if (lastElement) {
      const observerInstance = new IntersectionObserver(loadMoreGames)
      observer.current = observerInstance
      observerInstance.observe(lastElement)
    }

    return () => {
      if (currentObserver && lastElement) {
        currentObserver.unobserve(lastElement)
      }
    }
  }, [gameHistory, loading])

  return (
    <Box sx={{ padding: '3rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1 }}>
          <Link href="/quiz" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <ArrowBackIosIcon />
          </Link>
        </IconButton>
        <Typography variant="h4">{quizName}</Typography>
      </Box>

      {error && quiz === null ? (
        <MessageBox type="error" message="No Quiz found" />
      ) : (
        <Box>
          {loading && gameHistory.length === 0 ? (
            <CircularProgress />
          ) : error ? (
            <MessageBox type="error" message={error} />
          ) : (
            <Box>
              <Box sx={{ margin: '10px' }}>
                <Typography
                  variant="h6"
                  sx={{ margin: '10px', fontSize: '1.8rem', fontWeight: '800' }}
                >
                  Game History
                </Typography>

                {gameHistory.length === 0 ? (
                  <MessageBox type="info" message="No Games Played" />
                ) : (
                  <Box sx={{ justifyContent: 'center' }}>
                    <HistoryList gameHistory={gameHistory} />
                    <div ref={lastGameElementRef} style={{ height: '20px' }} />
                    {loading && <CircularProgress />}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default QuizDashboardPage
