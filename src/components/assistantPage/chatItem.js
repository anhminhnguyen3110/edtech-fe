import React from 'react'
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'
import { BLUE, RED } from '@/theme/palette' // Ensure the correct path is used

const ChatItem = ({ chat, onDelete }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const router = useRouter()

  const onViewClick = () => {
    router.push(`/assistant/${chat.id}`)
  }
  const handleDelete = () => {
    if (onDelete) {
      onDelete(chat.id)
    }
  }

  // Function to categorize the updatedAt date
  const categorizeDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const differenceInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24))

    if (differenceInDays === 0) {
      return 'Today'
    } else if (differenceInDays === 1) {
      return 'Yesterday'
    } else if (differenceInDays < 7) {
      return `${differenceInDays} days ago`
    } else {
      return `More than 7 days ago`
    }
  }

  const formattedDate = categorizeDate(chat.updatedAt)

  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {chat.topicName}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: '400', fontSize: isMobile ? '0.85rem' : '1rem', color: BLUE.main }}
          >
            {formattedDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            onClick={handleDelete}
            sx={{
              marginRight: '8px',
              borderColor: RED.light,
              borderRadius: '8px',
              padding: '5px 12px',
              width: '7rem',
              color: RED.main,
              '&:hover': {
                backgroundColor: RED.lighter,
                borderColor: RED.main,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1.1rem' }}>
              Delete
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={onViewClick}
            sx={{
              marginLeft: '16px',
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
        </Box>
      </Box>
    </CustomBox>
  )
}

export default ChatItem
