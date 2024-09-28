import React, { useEffect, useState, useRef } from 'react'
import { Popover, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { io } from 'socket.io-client'
import api from '@/lib/api'
import NotificationList from './notificationList'
import NotificationButton from './notificationButton'
import { useAuth } from '@/context/authContext'
import NotificationSnackbar from '../snackBar/notificationSnackbar'
const Notification = () => {
  const { accessToken } = useAuth()
  const [notifications, setNotifications] = useState([])
  const notificationsRef = useRef(notifications)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const fetchingRef = useRef(false)
  const socket = useRef(null)
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [snackbarNotifOpen, setSnackbarNotifOpen] = useState(false)
  const [snackbarNotif, setSnackbarNotif] = useState('')
  const [snackbarNotifSeverity, setSnackbarNotifSeverity] = useState('success')

  const handleCloseNotifSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarNotifOpen(false)
  }

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const fetchNotifications = async (pageNum = 1) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    setLoading(true) // Set loading to true
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500)); // 2 seconds delay
      const response = await api.get('/notifications', {
        params: {
          limit: 4,
          page: pageNum,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
        },
        authRequired: true,
      })
      const newNotifications = response.data.items.filter(
        (newNotification) =>
          !notificationsRef.current.some((notification) => notification.id === newNotification.id)
      )
      if (pageNum === 1) {
        setUnreadCount(newNotifications[0].numberOfUnreadNotifications)
      }
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, ...newNotifications]
        notificationsRef.current = updatedNotifications
        return updatedNotifications
      })
      setHasMore(response.data.meta.totalPages > pageNum)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      fetchingRef.current = false
      setLoading(false) // Set loading to false
    }
  }

  const fetchLatestNotification = async () => {
    try {
      const response = await api.get('/notifications', {
        params: {
          limit: 2,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
        },
        authRequired: true,
      })

      const newNotifications = response.data.items.filter(
        (newNotification) =>
          !notificationsRef.current.some((notification) => notification.id === newNotification.id)
      )

      if (newNotifications.length > 0) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [...newNotifications, ...prevNotifications]
          notificationsRef.current = updatedNotifications
          return updatedNotifications
        })
      }
    } catch (error) {
      console.error('Failed to fetch the latest notifications:', error)
    }
  }

  useEffect(() => {
    fetchNotifications(page)
  }, [page])

  useEffect(() => {
    if (!accessToken) return
    socket.current = io(process.env.NEXT_PUBLIC_NOTIFICATION_WEB_SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: `${accessToken}`,
      },
    })

    socket.current.on('connect', () => {
      console.log('Socket connected successfully')
    })

    socket.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    socket.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err)
    })

    const eventTypes = [
      'EXTRACT_ISSUE_SUCCESS',
      'EXTRACT_ISSUE_FAILED',
      'GENERATE_LESSON_SUCCESS',
      'GENERATE_LESSON_FAILED',
      'GENERATE_QUIZ_SUCCESS',
      'GENERATE_QUIZ_FAILED',
      'ACCOUNT_ACTIVATION_SUCCESS',
      'CREATE_GAME',
    ]

    const successEventTypes = [
      'EXTRACT_ISSUE_SUCCESS',
      'GENERATE_LESSON_SUCCESS',
      'GENERATE_QUIZ_SUCCESS',
      'ACCOUNT_ACTIVATION_SUCCESS',
      'CREATE_GAME',
    ]

    const failedEventTypes = [
      'EXTRACT_ISSUE_FAILED',
      'GENERATE_LESSON_FAILED',
      'GENERATE_QUIZ_FAILED',
    ]

    eventTypes.forEach((eventType) => {
      socket.current.on(eventType, (data) => {
        console.log(`Received event: ${eventType}`, data)
        console.log('Fetching the latest notifications...')
        setTimeout(() => {
          fetchLatestNotification()
        }, 600)
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1)
        setSnackbarNotif(data.message)
        if (failedEventTypes.includes(eventType)) {
          setSnackbarNotifSeverity('error')
        } else {
          setSnackbarNotifSeverity('success')
        }
        setSnackbarNotifOpen(true)
      })
    })

    return () => {
      eventTypes.forEach((eventType) => {
        socket.current.off(eventType)
      })
      socket.current.disconnect()
    }
  }, [accessToken])

  const loadMoreNotifications = () => {
    if (hasMore && !fetchingRef.current) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}`, { isRead: true }, { authRequired: true })
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        )
      )
      setUnreadCount((prevUnreadCount) => {
        if (prevUnreadCount <= 0) return 0
        return prevUnreadCount - 1
      })
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const handleNotificationRead = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'notification-popover' : undefined

  return (
    <>
      <NotificationSnackbar
        open={snackbarNotifOpen}
        message={snackbarNotif}
        type={snackbarNotifSeverity}
        onClose={handleCloseNotifSnackbar}
      />
      <NotificationButton unreadCount={unreadCount} onClick={handleNotificationClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            marginLeft: 1.5, // Adjust the value as needed to move the popover further to the right
          },
        }}
      >
        <NotificationList
          notifications={notifications}
          loadMoreNotifications={loadMoreNotifications}
          hasMore={hasMore}
          onNotificationRead={handleNotificationRead}
          loading={loading}
        />
      </Popover>
    </>
  )
}

export default Notification
