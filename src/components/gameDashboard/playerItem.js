import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Link,
  Tooltip,
} from '@mui/material'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CustomBox from '@/components/box/customBox'
import { BLUE, GRAY } from '@/theme/palette'

const PlayerItem = ({ player }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <CustomBox>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="2px"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box
          display="flex"
          alignItems="center"
          flex="1"
          maxWidth="80%"
          minWidth="0"
          justifyContent={isMobile ? 'center' : 'flex-start'}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                wordBreak: 'break-word',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              {player.nickname}
            </Typography>
          </Box>
        </Box>
        {/* New Box to group numPlayers and View button */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isMobile ? 'center' : 'flex-end'}
          flexShrink="0"
          gap={2} // Adds space between items
          mt={isMobile ? 2 : 0} // Adjust margin-top for mobile
        >
          {/* Players count */}
          <Tooltip title="Final Rank" arrow>
            <Box display="flex" alignItems="center" gap={0.3} sx={{ cursor: 'pointer' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '500',
                  fontSize: isMobile ? '1rem' : '1.4rem',
                  wordBreak: 'break-word',
                  textAlign: isMobile ? 'center' : 'left',
                  color: '#333',
                }}
              >
                {player.finalRank}
              </Typography>
              <EmojiEventsIcon
                sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: GRAY.darker }}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Final Score" arrow>
            <Box display="flex" alignItems="center" gap={0.6} sx={{ cursor: 'pointer' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '500',
                  fontSize: isMobile ? '1rem' : '1.4rem',
                  wordBreak: 'break-word',
                  textAlign: isMobile ? 'center' : 'left',
                  color: '#333',
                }}
              >
                {player.finalScore}
              </Typography>
              <SportsScoreIcon
                sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: GRAY.darker }}
              />
            </Box>
          </Tooltip>
          {/* View button */}
          <Link href={`/quiz`} passHref>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#90caf9',
                borderRadius: '8px',
                padding: '5px 12px',
                width: '7rem',
                color: BLUE.main,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#90caf9',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
                View
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </CustomBox>
  )
}

export default PlayerItem
