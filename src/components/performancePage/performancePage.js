/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, use } from 'react'
import { Search } from '@mui/icons-material'
import { TextField, Typography, InputAdornment, Box } from '@mui/material'
import PlayerCard from './playerCard'
import SelectedPlayersList from './selectedPlayerList'
import api from '@/lib/api'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import { useSelectedStudents } from './selectedStudentsContext'
import PerformanceModal from './performanceModal'
import SearchIcon from '@mui/icons-material/Search'
import { BLUE, GRAY } from '@/theme/palette'
import SelectedPlayersModal from './selectedplayerModal'
import { useRouter } from 'next/router'
const itemsPerPage = 10
const PlayerGameAnalysis = () => {
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const { error, clearError, selectedStudents } = useSelectedStudents()
  const [openModal, setOpenModal] = useState(false)
  const [checkLocalStorage, setCheckLocalStorage] = useState(false)
  const observer = useRef()
  const lastPlayerElementRef = useRef()
  const router = useRouter()

  const handleCloseSnackbar = () => {
    clearError() // Clear the error when the snackbar closes
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Fetch players without useCallback
  const fetchPlayers = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const response = await api.get('/games/game-history/performance/players', {
        params: {
          limit: itemsPerPage,
          page,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
          searchPlayerName: searchTerm,
        },
        authRequired: true,
      })

      const newPlayers = response.data.items
      newPlayers.forEach((player) => (player.selectedGames = []))

      setPlayers((prevPlayers) => {
        const uniquePlayers = newPlayers.filter(
          (newPlayer) => !prevPlayers.some((player) => player.nickname === newPlayer.nickname)
        )
        return [...prevPlayers, ...uniquePlayers]
      })

      if (newPlayers.length < itemsPerPage) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  // Lazy loading trigger
  const loadMorePlayers = (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [page, searchTerm])

  useEffect(() => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    const currentObserver = new IntersectionObserver(loadMorePlayers)
    if (lastPlayerElementRef.current) {
      currentObserver.observe(lastPlayerElementRef.current)
    }

    observer.current = currentObserver

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [players, loading, hasMore])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setPage(1) // Reset page number when searching
    setPlayers([]) // Clear players list for new search
    setHasMore(true) // Allow loading of new search results
  }

  const handleAnalyze = () => {
    localStorage.setItem('selectedStudents', JSON.stringify(selectedStudents))
    router.push('/performance/view')
  }

  return (
    <Box sx={{ padding: 6 }}>
      <Box sx={{ display: 'flex' }}></Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Performance Analysis
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder={'Search players...'}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '17rem', // Adjust the width to make the bar longer
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: GRAY.dark, // Default border color
                },
                '&:hover fieldset': {
                  borderColor: BLUE.main, // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: BLUE.main, // Border color when focused
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* <SelectedPlayersList onAnalyze={handleAnalyze} /> */}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '100%' }}>
          <Box>
            {players.map((player, index) => {
              if (players.length === index + 1) {
                return (
                  <Box ref={lastPlayerElementRef} key={index}>
                    <PlayerCard player={player} />
                  </Box>
                )
              } else {
                return (
                  <Box key={index}>
                    <PlayerCard player={player} />
                  </Box>
                )
              }
            })}

            {loading && <Typography>Loading...</Typography>}
          </Box>
        </Box>
      </Box>
      <SelectedPlayersModal onAnalyze={handleAnalyze} />
      <NotificationSnackbar
        type={'error'} // Set the snackbar type to error
        open={!!error} // Show snackbar if there is an error
        message={error} // Pass the error message to the snackbar
        onClose={handleCloseSnackbar} // Handle snackbar close event
      />
      {openModal && <PerformanceModal open={openModal} handleClose={handleCloseModal} />}
    </Box>
  )
}

export default PlayerGameAnalysis
