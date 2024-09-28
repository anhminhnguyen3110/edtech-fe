import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Drawer,
} from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'
import { useSelectedStudents } from './selectedStudentsContext' // Import the context
import { formatStartTime } from '@/lib/utils'
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded' // Import the new icon
import CloseIcon from '@mui/icons-material/Close' // Close icon for slider

const SelectedPlayersModal = ({ onAnalyze }) => {
  // Get the selected students and slider state from the context
  const { selectedStudents, removeGame, closeSlider, openSlider } = useSelectedStudents()
  const selectedPlayers = Object.values(selectedStudents) // Get the list of selected players

  const handleRemoveGame = (nickname, gameId) => {
    removeGame(nickname, gameId) // Call removeGame with player's nickname and gameId
  }

  return (
    <>
      {/* Drawer acting as a slider */}
      <Drawer
        anchor="right"
        open={openSlider}
        onClose={closeSlider}
        PaperProps={{
          sx: {
            width: '40vw', // Max width of 40vw
            padding: 2, // Add padding for a cleaner look
            paddingTop: 10,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {/* Main Content */}
          <Box>
            {/* Header Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: BLUE.main }}>
                Selected Players ({selectedPlayers.length})
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: BLUE.main, ':hover': { backgroundColor: BLUE.dark } }}
                onClick={onAnalyze}
              >
                Analyse
              </Button>
            </Box>

            {/* Players Section */}
            <Box display="flex" flexDirection="column" gap={4}>
              {selectedPlayers.map(({ player, games }) => (
                <Box key={player.playerId} sx={{ mb: 0 }}>
                  {/* Player's Name */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: BLUE.main, mb: 0 }}>
                    {player.nickname}
                  </Typography>

                  {/* Table of Games */}
                  <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: '40%' }}>
                          <strong>Quiz</strong>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          <strong>Start Time</strong>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          <strong>End Time</strong>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          <strong>Actions</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {games.map((game) => (
                        <TableRow key={game.gameId} sx={{ backgroundColor: 'inherit' }}>
                          <TableCell
                            sx={{ maxWidth: 300, whiteSpace: 'normal', wordWrap: 'break-word' }}
                          >
                            {game.quizName}
                          </TableCell>
                          <TableCell>{formatStartTime(game.startedAt)}</TableCell>
                          <TableCell>{formatStartTime(game.endedAt)}</TableCell>
                          <TableCell>
                            {/* Remove Game Button */}
                            <IconButton
                              aria-label="remove"
                              onClick={() => handleRemoveGame(player.nickname, game.gameId)} // Call handleRemoveGame with the correct parameters
                              sx={{
                                color: '#EE4E4E', // Darker red icon color
                                borderRadius: '50%', // Circular button
                                width: 36,
                                height: 36,
                              }}
                            >
                              <DoDisturbOnRoundedIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default SelectedPlayersModal
