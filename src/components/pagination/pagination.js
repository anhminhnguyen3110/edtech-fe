import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import { BLUE, GRAY } from '@/theme/palette'

const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: BLUE.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: BLUE.dark,
    },
  },
  '&:hover': {
    backgroundColor: GRAY.semiLight, // Change this to your desired hover color
  },
  fontSize: '1.25rem', // Increase font size
  height: '48px', // Increase height to make it circular
  width: '48px', // Ensure width matches height to make it circular
  borderRadius: '50%', // Ensure the shape is circular
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem', // Increase icon size
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem', // Adjust font size for small screens
    height: '36px', // Adjust height for small screens
    width: '36px', // Adjust width for small screens
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem', // Adjust icon size for small screens
    },
  },
}))

const PaginationComponent = ({ count, page, onChange }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Pagination
      showFirstButton
      showLastButton
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      siblingCount={isMobile ? 0 : 1} // Show 0 sibling page numbers on each side for mobile screens
      boundaryCount={isMobile ? 0 : 1} // Show 0 boundary page numbers for mobile screens
      renderItem={(item) => (
        <CustomPaginationItem
          slots={{
            first: FirstPageIcon,
            previous: ArrowBackIcon,
            next: ArrowForwardIcon,
            last: LastPageIcon,
          }}
          {...item}
        />
      )}
    />
  )
}

export default PaginationComponent
