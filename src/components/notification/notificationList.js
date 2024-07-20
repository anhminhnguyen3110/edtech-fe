/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  ListItemAvatar,
  Badge,
  CircularProgress,
  Divider,
} from '@mui/material'

const NotificationList = ({
  notifications,
  loadMoreNotifications,
  hasMore,
  onNotificationRead,
  loading,
}) => {
  // Ensure notifications is always an array
  const notificationArray = Array.isArray(notifications) ? notifications : []

  const handleScroll = (e) => {
    const tolerance = 10 // Tolerance in pixels
    const bottom =
      Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < tolerance
    if (bottom && hasMore && !loading) {
      loadMoreNotifications()
    }
  }

  const handleNotificationClick = (notification) => {
    onNotificationRead(notification) // Mark as read when clicked
  }

  useEffect(() => {
    const container = document.getElementById('notification-list')
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, loading])

  return (
    <Box sx={{ p: 2, width: 300, borderRadius: '30px' }}>
      <Box id="notification-list" sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <List>
          {notificationArray.length === 0 ? (
            <ListItem>
              <ListItemText sx={{ textAlign: 'center' }} primary="No notifications" />
            </ListItem>
          ) : (
            notificationArray.map((notification, index) => (
              <Box key={notification.id} sx={{ mb: 0 }}>
                <ListItem
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    mb: 0,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: notification.isRead ? 'transparent' : '#f0f0f0', // Light gray background for unread notifications
                    borderBottom:
                      index < notificationArray.length - 1 ? 'none' : '1px solid transparent', // No gap between ListItem and Divider
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src="/noti.png" alt="Notification Icon" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.createdAt).toLocaleString()}
                  />
                  {!notification.isRead && (
                    <Badge variant="dot" color="primary" sx={{ ml: 2 }} overlap="circular" />
                  )}
                </ListItem>
                {index < notificationArray.length - 1 && (
                  <Divider
                    variant={notification.isRead ? 'middle' : 'fullWidth'}
                    sx={{
                      height: '2px',
                      marginLeft: notification.isRead ? 4 : 0, // Middle variant has a small margin
                      marginRight: notification.isRead ? 4 : 0, // Middle variant has a small margin
                    }}
                  />
                )}
              </Box>
            ))
          )}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </List>
      </Box>
    </Box>
  )
}

export default NotificationList
