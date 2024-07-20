import React from 'react'
import { IconButton, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

const NotificationButton = ({ unreadCount, onClick }) => {
  return (
    <IconButton color="inherit" onClick={onClick}>
      <Badge
        badgeContent={unreadCount}
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '0.6rem',
            minWidth: '15px',
            height: '15px',
            padding: '0 3px',
            right: 3,
            top: 3,
          },
        }}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}

export default NotificationButton
