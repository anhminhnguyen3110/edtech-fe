import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, useMediaQuery, useTheme, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import api from '@/lib/api'
import MessageBox from '../box/messageBox'
import NotificationSnackbar from '@/components/snackBar/notificationSnackbar'
import ChatBox from './chatBox'
import ChatHeader from './chatHeader'
import ChatList from './chatList'
import ErrorNotification from './errorNotification'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import IconButton from '@mui/material/IconButton'
import SuggestionModal from './suggestionModal'
import { BLUE } from '@/theme/palette'
import useModal from './useModal'
import MessageTooltip from './messageToolTip'

const ChatPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
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
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const [lastFile, setLastFile] = useState(null)
  const [boxHeight, setBoxHeight] = useState('97vh')
  const { isOpen, openModal, closeModal } = useModal()
  const [isOpenToolTip, setIsOpenToolTip] = useState(false)
  const [messageToolTip, setMessageToolTip] = useState(null)

  const fetchChat = useCallback(
    async (pageNumber = 1) => {
      try {
        setLoading(true)
        const response = await api.get(`/chats/topics/${id}`, {
          params: {
            page: pageNumber,
            limit: 9,
          },
          authRequired: true,
        })
        const newChats = response.data.items
        const metadata = response.data.meta

        if (pageNumber === 1) {
          setChats(newChats)
          setTopicName(newChats[0].topicName)
        } else {
          setChats((prevChats) => {
            // Filter out duplicate chats to ensure uniqueness
            const uniqueChats = newChats.filter(
              (newChat) => !prevChats.some((chat) => chat.id === newChat.id)
            )

            if (pageNumber === 1) {
              setTopicName(uniqueChats.length > 0 ? uniqueChats[0].topicName : '')
              return uniqueChats
            } else {
              return [...prevChats, ...uniqueChats]
            }
          })
        }

        setHasMore(metadata.currentPage < metadata.totalPages)
        setPage(metadata.currentPage)
      } catch (error) {
        console.error('Error fetching chat:', error.response.data)
        if (pageNumber === 1) {
          setError('Chat not found')
          showSnackbar('Chat not found', 'error')
          setNotExist(true)
        } else {
          console.error('Error fetching chat:', error)
          setError('Failed to fetch chat. Please try again.')
          showSnackbar('Error fetching chat', 'error')
        }
      } finally {
        setLoading(false)
      }
    },
    [id]
  )

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight < 600 ? 'calc(97vh - 70px)' : 'calc(97vh - 60px)' // Adjust 600 to your desired threshold
      setBoxHeight(newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Call handleResize once to set the initial state based on the current window size
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const handleDelete = async (newTopicName) => {
    try {
      await api.delete(`/chats/topics/${id}`, { authRequired: true })
      showSnackbar('Topic deleted successfully', 'success')
      router.push('/assistant')
    } catch (error) {
      console.error('Error saving topic name:', error)
      showSnackbar('Failed to delete the chat. Please try again.', 'error')
    }
  }

  const handleSendSuggestion = async (suggestion, title, url) => {
    console.log('Suggestion:', suggestion)
    setIsOpenToolTip(true)
    setMessageToolTip({ title, url })
    const newChat = {
      id: chats.length + 1,
      message: suggestion,
      role: 'user',
      updatedAt: new Date().toISOString(),
      file: null,
    }
    console.log(newChat)
    setChats([...chats, newChat])
    setWaitingResponse(true)
    const formData = new FormData()
    formData.append('message', suggestion)
    formData.append('topicId', id)
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
      setLastMessage(suggestion)
      console.error('Error generating chat:', error)
      setSendError(true)
      showSnackbar('Error generating chat', 'error')
    } finally {
      setWaitingResponse(false)
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
    setWaitingResponse(true)
    const formData = new FormData()
    formData.append('message', newMessage)
    formData.append('topicId', id)
    if (file) {
      formData.append('document', file)
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
      setLastMessage(newMessage)
      setLastFile(file)
      console.error('Error generating chat:', error)
      setSendError(true)
      showSnackbar('Error generating chat', 'error')
    } finally {
      setWaitingResponse(false)
    }
  }

  const handleRetry = async () => {
    setWaitingResponse(true)
    const formData = new FormData()
    formData.append('message', lastMessage)
    formData.append('topicId', id)
    if (lastFile) {
      formData.append('document', lastFile)
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
      setSendError(false)
      setLastMessage(null)
      setLastFile(null)
    } catch (error) {
      setLastMessage(lastMessage)
      setLastFile(lastFile)
      console.error('Error generating chat:', error)
      setSendError(true)
      showSnackbar('Error generating chat', 'error')
    } finally {
      setWaitingResponse(false)
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
    <Box
      display="flex"
      flexDirection="column"
      height="97vh"
      width="100%"
      overflow="hidden"
      marginTop="20px"
      maxHeight={boxHeight}
      maxWidth={isMobile ? '95vw' : isTablet ? '88vw' : '90vw'}
    >
      <ChatHeader
        topicName={topicName}
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDelete}
      />
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
        maxWidth="98vw"
      >
        <Box
          width={isMobile ? '90%' : '70%'}
          padding={2}
          borderRadius="10px"
          height="97vh" // Adjust as needed
          overflow="hidden" // This will clip the content to the box boundaries
          maxWidth={isMobile ? '100%' : '70%'}
        >
          <ChatList
            chats={chats}
            loadMoreChats={loadMoreChats}
            hasMore={hasMore}
            loading={loading}
            waitingResponse={waitingResponse}
          />
        </Box>
        {sendError ? (
          <Box
            width={isMobile ? '90%' : '70%'}
            display="flex"
            flexDirection="column"
            padding={2}
            borderRadius="10px"
            boxShadow={3}
            bgcolor="#fff"
          >
            <ErrorNotification onRetry={handleRetry} />
          </Box>
        ) : (
          <Box
            width={isMobile ? '90%' : '70%'}
            display="flex"
            flexDirection="column"
            paddingLeft={1}
            paddingRight={1}
            borderRadius="10px"
          >
            <ChatBox sendChat={handleSendMessage} />
          </Box>
        )}
      </Box>
      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
      <SuggestionModal
        open={isOpen}
        handleClose={closeModal}
        sendSuggestion={handleSendSuggestion}
      />
      {/* Button for suggestion modal */}
      {!isMobile && (
        <Tooltip
          title={
            <MessageTooltip
              url={messageToolTip ? messageToolTip.url : null}
              linkText={messageToolTip ? messageToolTip.title : null}
            />
          }
          open={isOpenToolTip}
          disableHoverListener
        >
          <IconButton
            color="primary"
            sx={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              bgcolor: 'background.paper',
              boxShadow: 3,
              padding: 1.4,
            }}
            onClick={() => {
              openModal()
              setIsOpenToolTip(!isOpenToolTip)
            }}
          >
            <TipsAndUpdatesIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default ChatPage
