import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import MessageBox from '../box/messageBox'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import ChatBox from './chatBox'
import ChatHeader from './chatHeader'
import ChatList from './chatList'

const ChatPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const { id } = router.query
  const [chats, setChats] = useState([])
  const [topicName, setTopicName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notExist, setNotExist] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchChat = useCallback(
    async (pageNumber = 1) => {
      try {
        setLoading(true)
        const response = await api.get(`/chats/topics/${id}`, {
          params: {
            page: pageNumber,
            limit: 6,
          },
          authRequired: true,
        })
        const newChats = response.data.items
        const metadata = response.data.meta

        if (pageNumber === 1) {
          setChats(newChats)
        } else {
          setChats((prevChats) => [...prevChats, ...newChats])
        }

        setTopicName('Basic Addition: Sum of 1 and 1')
        setHasMore(metadata.currentPage < metadata.totalPages)
        setPage(metadata.currentPage)
      } catch (error) {
        console.error('Error fetching chat:', error)
        setError('Failed to fetch chat. Please try again.')
        showSnackbar('Error fetching chat', 'error')
        setNotExist(true)
      } finally {
        setLoading(false)
      }
    },
    [id]
  )

  useEffect(() => {
    if (id) {
      fetchChat()
    }
  }, [id, fetchChat])

  const loadMoreChats = () => {
    if (hasMore && !loading) {
      fetchChat(page + 1)
    }
  }

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const handleSaveClick = async (newTopicName) => {
    try {
      await api.patch(`/chats/topics/${id}`, { topicName: newTopicName }, { authRequired: true })
      setTopicName(newTopicName)
      showSnackbar('Topic name updated successfully', 'success')
    } catch (error) {
      console.error('Error saving topic name:', error)
      showSnackbar('Failed to save topic name. Please try again.', 'error')
    }
  }

  const handleSendMessage = async (newMessage, file) => {
    const newChat = {
      id: chats.length + 1,
      message: newMessage,
      role: 'user',
      updatedAt: new Date().toISOString(),
      file: file ? { fileName: file.name } : null,
    }
    setChats([...chats, newChat])
    const formData = new FormData()
    formData.append('message', newMessage)
    formData.append('topicId', id)
    if (file) {
      formData.append('file', file)
    }
    try {
      const response = await api.post('/chats', formData, { authRequired: true })
      const res = response.data
      console.log(res)
      const assistantAnswer = {
        id: chats.length + 1,
        message: res.answer,
      }
      setChats((prevChats) => [...prevChats, assistantAnswer])
    } catch (error) {
      console.error('Error creating chat:', error)
      setSnackbarNotifSeverity('error')
      setSnackbarNotif('Error while creating chat.')
      setSnackbarNotifOpen(true)
    }
  }

  if (loading && chats.length === 0) {
    return <Typography>Loading...</Typography>
  }

  if (notExist) {
    return (
      <>
        <MessageBox message={error} />
        <NotificationSnackbar
          open={snackbar.open}
          message={snackbar.message}
          type={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </>
    )
  }

  return (
    <Box display="flex" flexDirection="column" height="80vh" width="100%" overflow="hidden">
      <ChatHeader topicName={topicName} onSaveClick={handleSaveClick} />
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
        overflow="hidden"
      >
        <Box
          width={isMobile ? '90%' : '70%'}
          padding={2}
          borderRadius="10px"
          height="calc(100vh - 200px)" // Adjust as needed
          overflow="hidden" // This will clip the content to the box boundaries
        >
          <ChatList
            chats={chats}
            loadMoreChats={loadMoreChats}
            hasMore={hasMore}
            loading={loading}
          />
        </Box>
        <Box
          width={isMobile ? '90%' : '70%'}
          display="flex"
          flexDirection="column"
          padding={2}
          borderRadius="10px"
          boxShadow={3}
          bgcolor="#fff"
        >
          <ChatBox sendChat={handleSendMessage} />
        </Box>
      </Box>
      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  )
}

export default ChatPage
