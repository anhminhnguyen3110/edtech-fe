/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Avatar,
  ListItemAvatar,
  Badge,
  CircularProgress,
  Divider,
} from '@mui/material'
import AutoShrinkText from './autoShrinkText'
import { BLUE } from '@/theme/palette'
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

  function formatDate(dateString) {
    const date = new Date(dateString)
    const today = new Date()

    // Calculate the difference in time
    const timeDiff = today - date

    // Calculate the difference in days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    // Return the appropriate string based on the days difference
    if (daysDiff === 0) return 'Today'
    if (daysDiff === 1) return 'Yesterday'
    if (daysDiff > 1 && daysDiff <= 7) return `${daysDiff} days ago`

    // For dates older than 7 days, return the full date
    return date.toLocaleDateString()
  }

  useEffect(() => {
    const container = document.getElementById('notification-list')
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, loading])

  return (
    <Box sx={{ p: 2, width: 400, borderRadius: '30px' }}>
      <Box id="notification-list" sx={{ maxHeight: 300, overflowY: 'auto', overflowX: 'hidden' }}>
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
                    cursor: notification.isRead ? '' : 'pointer',
                    mb: 0,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: notification.isRead ? 'transparent' : '#f0f0f0', // Light gray background for unread notifications
                    borderBottom:
                      index < notificationArray.length - 1 ? 'none' : '1px solid transparent', // No gap between ListItem and Divider
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src="/noti.png"
                      alt="Notification Icon"
                      sx={{
                        width: '4rem',
                        height: '4rem',
                        marginRight: '3px',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<AutoShrinkText text={notification.message} />}
                    secondary={
                      <span style={{ color: BLUE.main }}>{formatDate(notification.createdAt)}</span>
                    }
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
