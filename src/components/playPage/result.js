import React from 'react'
import { Box, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { BLUE } from '@/theme/palette'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const Result = ({ result }) => {
  console.log(result)
  const { isCorrect, pointAwarded, strikeCount } = result
  const backgroundColor = isCorrect ? BLUE.main : 'rgba(255, 0, 0, 0.4755)'
  const textColor = isCorrect ? '#fff' : '#fff'
  console.log('isCorrect', isCorrect, backgroundColor)

  return (
    <Box
      sx={{
        p: 4,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: backgroundColor,
        color: textColor,
      }}
    >
      {isCorrect && (
        <>
          <Typography variant="h1" align="center">
            +{Math.round(pointAwarded)}
          </Typography>
          <EmojiEventsIcon style={{ fontSize: 200, margin: '20px 0' }} />
          <Typography variant="h2" align="center">
            Correct
          </Typography>
          {strikeCount > 0 && (
            <Typography variant="h5" align="center">
              Strike count +{strikeCount}
            </Typography>
          )}
        </>
      )}
      {!isCorrect && (
        <>
          <ClearOutlinedIcon style={{ fontSize: 200, margin: '20px 0' }} />
          <Typography variant="h2" align="center">
            Incorrect
          </Typography>
        </>
      )}
    </Box>
  )
}

export default Result
