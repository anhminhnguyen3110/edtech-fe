import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import api from '@/lib/api'
import { BLUE, GRAY } from '@/theme/palette'
import { useSelectedStudents } from './selectedStudentsContext'

const formatGameTime = (startedAt, endedAt) => {
  const startDate = new Date(startedAt)
  const endDate = new Date(endedAt)

  const formatTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    // Convert to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // Convert hour '0' to '12' for 12 AM/PM format

    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`
  }

  if (startDate.toDateString() === endDate.toDateString()) {
    // Same day
    return `${
      formatTime(startDate).split(' ')[0] + ' ' + formatTime(startDate).split(' ')[1]
    } - ${formatTime(endDate)}`
  } else {
    // Different days
    return `${formatTime(startDate)} - ${formatTime(endDate)}`
  }
}

const PlayerCard = ({ player }) => {
  const [games, setGames] = useState([])
  const [showGames, setShowGames] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gamesFetched, setGamesFetched] = useState(false)

  const { selectedStudents, addGame, removeGame } = useSelectedStudents()

  const isGameSelected = (gameId) => {
    const selectedPlayer = selectedStudents[player.nickname]
    if (selectedPlayer) {
      return selectedPlayer.games.some((game) => game.gameId === gameId)
    }
    return false
  }

  const handleToggleGames = async () => {
    setShowGames(!showGames)

    if (!gamesFetched && !showGames) {
      setLoading(true)
      try {
        const response = await api.get(
          `/games/game-history/performance/games?playerNickname=${player.nickname}`,
          { authRequired: true }
        )
        setGames(response.data)
        setGamesFetched(true)
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleGameSelect = (game) => {
    if (!isGameSelected(game.gameId)) {
      addGame(player, game)
    } else {
      removeGame(player.nickname, game.gameId)
    }
  }

  return (
    <Card sx={{ mb: 2, border: `2px solid ${BLUE.main}`, borderRadius: '10px' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h6" color={BLUE.main} fontWeight="800">
            {player.nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Total Games: {player.totalGames}
          </Typography>
        </div>
        <Button onClick={handleToggleGames}>{showGames ? <ExpandLess /> : <ExpandMore />}</Button>
      </CardContent>

      {showGames && (
        <Box sx={{ px: 2, mb: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : games && games.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {games.map((game) => (
                <Box
                  key={game.gameId}
                  onClick={() => handleGameSelect(game)}
                  sx={{
                    p: 2,
                    borderRadius: '10px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow on the right
                    border: `1px solid ${isGameSelected(game.gameId) ? BLUE.main : BLUE.main}`,
                    backgroundColor: isGameSelected(game.gameId) ? BLUE.main : 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: isGameSelected(game.gameId) ? BLUE.dark : GRAY.dark,
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color={isGameSelected(game.gameId) ? 'white' : 'black'}
                  >
                    {game.quizName}
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="body2"
                      color={isGameSelected(game.gameId) ? 'white' : 'black'}
                    >
                      {formatGameTime(game.startedAt, game.endedAt)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No games available.
            </Typography>
          )}
        </Box>
      )}
    </Card>
  )
}

export default PlayerCard
