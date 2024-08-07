import React from 'react'
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'
import { BLUE } from '@/theme/palette' // Ensure the correct path is used

const ChatItem = ({ chat }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const router = useRouter()

  const onViewClick = () => {
    router.push(`/assistant/${chat.id}`)
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
    } else {
      return `Previous 7 Days`
    }
  }

  const formattedDate = categorizeDate(chat.updatedAt)

  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h6"
            sx={{ fontWeight: '500', fontSize: isMobile ? '1.1rem' : '1.5rem' }}
          >
            {chat.topicName}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: '400', fontSize: isMobile ? '0.85rem' : '1rem', color: 'grey.600' }}
          >
            {formattedDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            onClick={onViewClick}
            sx={{
              marginLeft: '16px',
              borderColor: '#90caf9', // Border color similar to the example
              borderRadius: '8px', // Rounded corners
              padding: '5px 12px', // Reduced padding for a thinner appearance
              width: '7rem', // Specific width to make the button longer
              color: BLUE.main, // Text color similar to the example
              '&:hover': {
                backgroundColor: '#e3f2fd', // Light blue background on hover
                borderColor: '#90caf9', // Keep border color on hover
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
