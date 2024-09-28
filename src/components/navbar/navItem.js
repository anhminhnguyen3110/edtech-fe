import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Box, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { BLUE } from '../../theme/palette'

const NavItem = ({ item, open }) => {
  const router = useRouter()
  const isActive = router.pathname.includes(item.path)
  const theme = useTheme()

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: open ? '8px' : '8px 8px',
    margin: '4px',
    fontSize: '1.5rem',
    fontWeight: '600',
    borderRadius: '20px',
    backgroundColor: isActive ? BLUE.main : 'transparent',
    color: isActive ? 'white' : '#6D6D6D',
    width: open ? 'auto' : 'fit-content',
    transition: `all ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`,
    '&:hover': {
      backgroundColor: BLUE.main,
      color: 'white',
      cursor: 'pointer',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
      '& .MuiListItemText-root': {
        color: 'white',
      },
    },
  }

  const iconStyle = {
    fontSize: '10rem', // Increase this value to make the icon bigger
    color: isActive ? 'white' : '#6D6D6D',
    padding: '8px',
    minWidth: 'unset',
  }

  const textStyle = {
    marginLeft: open ? '12px' : '0px',
    opacity: open ? 1 : 0,
    width: open ? 'auto' : '0px',
    transition: `margin-left ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}, opacity ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}, width ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }

  return (
    <Link href={item.path} sx={{ textDecoration: 'none' }}>
      <ListItem sx={listItemStyle}>
        <ListItemIcon sx={iconStyle}>{item.icon}</ListItemIcon>
        <Box sx={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <ListItemText primary={item.name} sx={textStyle} />
        </Box>
      </ListItem>
    </Link>
  )
}

export default NavItem
