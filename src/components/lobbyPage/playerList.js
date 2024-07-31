import React from 'react'
import { Stack, Typography } from '@mui/material'

const PlayerList = ({ players, fontSize, spacing }) => {
  return (
    <Stack direction="row" spacing={spacing} justifyContent="center" flexWrap="wrap">
      {players.map((player, index) => (
        <Typography
          key={index}
          variant="h5"
          align="center"
          style={{ minWidth: '100px', fontSize: fontSize }}
        >
          {player.nickname}
        </Typography>
      ))}
    </Stack>
  )
}

export default PlayerList
