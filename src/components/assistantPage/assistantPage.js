/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Box, Typography, Container, CircularProgress } from '@mui/material'
import ChatItem from './chatItem'
import api from '@/lib/api'
import DynamicGreeting from './dynamicGreeting'
import StyledPaper from './styledPaper'
import ChatInterface from './chatInterface'
import MessageBox from '@/components/box/messageBox'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import { useRouter } from 'next/router'

const AssistantPage = () => {
  const [chats, setChats] = useState([])
  const [chatIds, setChatIds] = useState(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [snackbarNotifOpen, setSnackbarNotifOpen] = useState(false)
  const [snackbarNotif, setSnackbarNotif] = useState('')
  const [snackbarNotifSeverity, setSnackbarNotifSeverity] = useState('success')
  const router = useRouter()
  const observer = useRef()

  const lastChatElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/chats/topics', {
          params: { page, limit: 10 },
          authRequired: true,
        })
        const { items, meta } = response.data
        setChats((prevChats) => {
          const newChats = items.filter((item) => !chatIds.has(item.id))
          newChats.forEach((chat) => chatIds.add(chat.id))
          return [...prevChats, ...newChats]
        })
        setHasMore(meta.currentPage < meta.totalPages)
      } catch (error) {
        console.error('Error fetching data:', error)
        setSnackbarNotifSeverity('error')
        setSnackbarNotif('Error while fetching data.')
        setSnackbarNotifOpen(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchChats()
  }, [page])

  const handleDeleteChat = async (chatId) => {
    if (!chatId) {
      return
    }
    try {
      await api.delete(`/chats/topics/${chatId}`, { authRequired: true })
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId))
      setSnackbarNotifSeverity('success')
      setSnackbarNotif('Chat deleted successfully.')
      setSnackbarNotifOpen(true)
    } catch (error) {
      console.error('Error deleting chat:', error)
      setSnackbarNotifSeverity('error')
      setSnackbarNotif('Error while deleting chat.')
      setSnackbarNotifOpen(true)
    }
  }

  const handleCreateChat = async (message, file) => {
    if (!message) {
      return
    }
    const formData = new FormData()
    formData.append('message', message)
    if (file) {
      formData.append('document', file)
    }
    try {
      const response = await api.post('/chats', formData, { authRequired: true })
      const newChat = response.data
      router.push(`/assistant/${newChat.chatTopicId}`)
      return newChat
    } catch (error) {
      console.error('Error creating chat:', error)
      setSnackbarNotifSeverity('error')
      setSnackbarNotif('Error while creating chat.')
      setSnackbarNotifOpen(true)
      return null
    }
  }

  const handleCloseNotifSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarNotifOpen(false)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <DynamicGreeting />
        <StyledPaper elevation={3} sx={{ mb: 4 }}>
          <ChatInterface createChat={handleCreateChat} />
        </StyledPaper>

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Your recent chats
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {chats.length === 0 && !isLoading && (
            <MessageBox severity="info" message="No chats found." />
          )}
          {chats.map((chat, index) => (
            <div key={chat.id} ref={index === chats.length - 1 ? lastChatElementRef : null}>
              <ChatItem chat={chat} onDelete={handleDeleteChat} />
            </div>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
      <NotificationSnackbar
        open={snackbarNotifOpen}
        message={snackbarNotif}
        type={snackbarNotifSeverity}
        onClose={handleCloseNotifSnackbar}
      />
    </Container>
  )
}

export default AssistantPage
