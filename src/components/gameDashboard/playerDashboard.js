// PlayerDashboard.js
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PlayerRow from './playerRow'
import PlayerModal from './playerModal'
const PlayerDashboard = ({ players }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleOpenModal = (playerId) => {
    const player = players.find((p) => p.playerId === playerId)
    if (player) {
      setSelectedPlayer(player)
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPlayer(null)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="player dashboard table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}>
                Nickname
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Final Rank
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Final Score
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Correct Answers
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                isMobile={isMobile}
                openModal={handleOpenModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PlayerModal
        open={modalOpen}
        handleClose={handleCloseModal}
        player={selectedPlayer}
        totalPlayers={players.length}
        players={players}
      />
    </>
  )
}

export default PlayerDashboard
