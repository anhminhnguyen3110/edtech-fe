import React from 'react'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

const PlayerList = ({ players }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isLg = useMediaQuery(theme.breakpoints.down('lg'))
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))

  // Determine the base font size and max players based on screen size
  let baseFontSize
  let maxPlayersToShow

  if (isXs) {
    baseFontSize = '0.75rem'
    maxPlayersToShow = 10
  } else if (isSm) {
    baseFontSize = '1rem'
    maxPlayersToShow = 15
  } else if (isMd) {
    baseFontSize = '1.25rem'
    maxPlayersToShow = 20
  } else if (isLg) {
    baseFontSize = '1.4rem'
    maxPlayersToShow = 26
  } else if (isXl) {
    baseFontSize = '2rem'
    maxPlayersToShow = 30
  } else {
    baseFontSize = '1.25rem'
    maxPlayersToShow = 25
  }

  // Adjust font size based on the number of players
  const calculatedFontSize =
    players.length < maxPlayersToShow
      ? `calc(${baseFontSize} + ${(maxPlayersToShow - players.length) * 0.05}rem)`
      : baseFontSize

  return (
    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
      {players.slice(0, maxPlayersToShow).map((player, index) => (
        <Typography
          key={index}
          variant="h5"
          align="center"
          style={{ minWidth: '80px', fontSize: calculatedFontSize }}
        >
          {player.nickname}
        </Typography>
      ))}
      {players.length > maxPlayersToShow && (
        <Typography
          variant="h5"
          align="center"
          style={{ minWidth: '80px', fontSize: calculatedFontSize }}
        >
          ...
        </Typography>
      )}
    </Stack>
  )
}

export default PlayerList
