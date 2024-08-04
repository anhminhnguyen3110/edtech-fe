import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, CircularProgress } from '@mui/material'
import ChatItem from './chatItem'
import api from '@/lib/api'
import DynamicGreeting from './dynamicGreeting'
import StyledPaper from './styledPaper'
import ChatInterface from './chatInterface'
import PaginationComponent from '../pagination/pagination'
import MessageBox from '@/components/box/messageBox'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import { useRouter } from 'next/router'
const AssistantPage = () => {
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4) // Set default items per page
  const [snackbarNotifOpen, setSnackbarNotifOpen] = useState(false)
  const [snackbarNotif, setSnackbarNotif] = useState('')
  const [snackbarNotifSeverity, setSnackbarNotifSeverity] = useState('success')
  const router = useRouter()
  useEffect(() => {
    const fetchChats = async (page = 1, limit = itemsPerPage) => {
      try {
        setIsLoading(true)
        const response = await api.get('/chats/topics', {
          params: { page, limit },
          authRequired: true,
        })
        const { items, meta } = response.data
        setChats(items)
        setCurrentPage(meta.currentPage)
        setTotalItems(meta.totalItems)
        setItemsPerPage(meta.itemsPerPage)
      } catch (error) {
        console.error('Error fetching data:', error)
        setSnackbarNotifSeverity('error')
        setSnackbarNotif('Error while fetching data.')
        setSnackbarNotifOpen(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchChats(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  const handleCreateChat = async (message, file) => {
    if (!message) {
      return
    }
    const formData = new FormData()
    formData.append('message', message)
    if (file) {
      formData.append('file', file)
    }
    try {
      const response = await api.post('/chats', formData, { authRequired: true })
      const newChat = response.data
      console.log(newChat)
      router.push(`/assistant/${newChat.chatTopicId}`)
      return newChat
      // setChats((prevChats) => [newChat, ...prevChats]);
    } catch (error) {
      console.error('Error creating chat:', error)
      setSnackbarNotifSeverity('error')
      setSnackbarNotif('Error while creating chat.')
      setSnackbarNotifOpen(true)
    }
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
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

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
          Your recent chats
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {chats.length === 0 && <MessageBox severity="info" message="No chats found." />}
            {chats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}

            {Math.ceil(totalItems / itemsPerPage) > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <PaginationComponent
                  count={Math.ceil(totalItems / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </Box>
        )}
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
