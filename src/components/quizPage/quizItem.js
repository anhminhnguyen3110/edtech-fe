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
  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" alignItems="center">
          <RocketLaunchIcon
            style={{
              marginRight: '16px',
              fontSize: isMobile ? '1.2rem' : '2rem',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: '500', fontSize: isMobile ? '1.1rem' : '1.5rem' }}
          >
            {quiz.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
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
