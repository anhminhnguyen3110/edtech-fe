import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
} from '@mui/material'
import { styled } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import { BLUE } from '../../theme/palette'
import api from '@/lib/api'
const ToggleIcon = styled('img')({
  width: 24,
  height: 24,
  transition: 'filter 0.3s',
  '&:hover': {
    filter: 'hue-rotate(180deg) brightness(1.2) contrast(1.2)',
  },
})

const AppBarMain = ({ open, toggleDrawer, logout }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [accountInfo, setAccountInfo] = useState(null) // [1
  const [anchorEl, setAnchorEl] = useState(null)

  const handleNotificationClick = () => {
    // Placeholder for notification click handler
    console.log('Notification icon clicked')
  }

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
  }

  const appBarStyle = {
    zIndex: 1201,
    backgroundColor: BLUE.main,
  }
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await api.get('/auth/account', { authRequired: true })
        setAccountInfo(response.data)
      } catch (error) {
        console.error('Failed to fetch account info:', error)
        if (error.response) {
          console.error('Server Error:', error.response.data)
        } else if (error.request) {
          console.error('No response from server')
        } else {
          console.error('Error:', error.message)
        }
      }
    }

    fetchAccountInfo()
  }, [])

  const getInitials = (name) => {
    if (!name) return ''
    const nameParts = name.split(' ')
    const initials = nameParts.map((part) => part[0]).join('')
    return initials
  }

  return (
    <AppBar position="fixed" style={appBarStyle}>
      <Toolbar sx={{ padding: isMobile ? '' : '0 55px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          {!open ? <ToggleIcon src="/toggle-icon.png" alt="Toggle" /> : <ArrowBackIcon />}
        </IconButton>
        <Typography variant="h6" noWrap>
          EDTech Assistant
        </Typography>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <NotificationsIcon />
          </IconButton>
          <Typography
            variant="body1"
            noWrap
            onClick={handleUserClick}
            style={{ marginLeft: '8px', cursor: 'pointer' }}
          >
            {accountInfo ? accountInfo.name : 'Name'}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
            PaperProps={{
              style: {
                marginTop: '10px', // Adjust this value as needed to position the menu below the AppBar
              },
            }}
          >
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Avatar sx={{ mb: 1 }}>{accountInfo ? getInitials(accountInfo.name) : 'N'}</Avatar>
              <Typography variant="h6">{accountInfo ? accountInfo.name : 'Name'}</Typography>
              <Typography variant="body2">{accountInfo ? accountInfo.email : 'Email'}</Typography>
            </div>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Log out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarMain
