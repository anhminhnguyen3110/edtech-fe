import React from 'react'
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material'
import CustomBox from '../box/customBox'
import { useRouter } from 'next/router'
import { BLUE } from '@/theme/palette' // Ensure the correct path is used

const AssessmentItem = ({ assessment }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const router = useRouter()

  const onViewClick = () => {
    router.push(`/assignment/${assessment.id}`)
  }

  return (
    <CustomBox>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            sx={{ fontWeight: '500', fontSize: isMobile ? '1.1rem' : '1.5rem' }}
          >
            {assessment.name} - {assessment.year}
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

export default AssessmentItem
