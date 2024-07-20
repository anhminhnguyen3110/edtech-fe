import React from 'react'
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EditIcon from '@mui/icons-material/Edit'
import ButtonComponent from '../button/buttonComponent'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'

const QuizItem = ({ quiz }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const router = useRouter()

  const onEditClick = () => {
    router.push(`/quiz/${quiz.id}`)
  }

  // Function to truncate the quiz name if it exceeds 15 characters
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" alignItems="center" flex="1" minWidth="0">
          <RocketLaunchIcon
            style={{
              marginRight: '16px',
              fontSize: isMobile ? '1.2rem' : '2rem',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: '1',
              minWidth: '0',
            }}
          >
            {isMobile ? truncateText(quiz.name, 12) : quiz.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexShrink="0">
          <IconButton onClick={onEditClick}>
            <EditIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 'bold' }} />
          </IconButton>
          <ButtonComponent variant="contained" style={{ marginLeft: '16px' }}>
            <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
              Host Live
            </Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </CustomBox>
  )
}

export default QuizItem
