import React from 'react'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

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
    backgroundColor: '#3CA3F5',
    transition: 'width 0.3s ease, left 0.3s ease',
  },
  '&:hover': {
    color: '#3CA3F5', // Change text color on hover
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
      color={active ? '#2196F3' : 'black'}
      sx={{
        fontSize: { xs: '1rem', md: '1.25rem' },
        borderBottom: active ? '4px solid #3CA3F5' : 'none',
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
