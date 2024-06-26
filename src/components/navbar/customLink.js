import React from 'react'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { BLUE } from '../../theme/palette'
const AnimatedUnderline = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  marginBottom: '4px', // Add some space between the text and the underline
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '4px',
    bottom: '-8px', // Adjust this to add space between text and underline
    left: '50%',
    backgroundColor: BLUE['light'],
    transition: 'width 0.3s ease, left 0.3s ease',
  },
  '&:hover': {
    color: BLUE['light'], // Change text color on hover
    transition: '0.3s ease',
  },
  '&:hover:before': {
    width: '100%',
    left: '0',
  },
}))

function NavItem({ text, active, link }) {
  return (
    <Typography
      component="a"
      href={link}
      color={active ? BLUE['light'] : 'black'}
      sx={{
        fontSize: { xs: '1rem', md: '1.25rem' },
        borderBottom: active ? `4px solid ${BLUE['light']}` : 'none',
        display: 'inline-block',
        cursor: 'pointer',
        textDecoration: 'none', // Remove default underline for links
      }}
    >
      <AnimatedUnderline>{text}</AnimatedUnderline>
    </Typography>
  )
}

export default NavItem
