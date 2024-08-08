/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import ChatMessage from './chatMessage'
import WaitingMessage from './waitingMessage'

const ChatList = ({ chats, loadMoreChats, hasMore, loading, waitingResponse }) => {
  const chatListRef = useRef(null)
  const lastMessageRef = useRef(null)
  const previousChatsLength = useRef(chats.length)

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }

  const handleScroll = (e) => {
    const tolerance = 10 // Tolerance in pixels
    const top = e.target.scrollTop < tolerance // Check if near the top
    if (top && hasMore && !loading) {
      loadMoreChats()
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [waitingResponse])

  useEffect(() => {
    const container = document.getElementById('chat-list')
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [hasMore, loading])

  useEffect(() => {
    if (previousChatsLength.current < chats.length) {
      const container = chatListRef.current
      const scrollHeightBefore = container.scrollHeight

      // Force re-rendering to compute the new scrollHeight after chats update
      setTimeout(() => {
        const scrollHeightAfter = container.scrollHeight
        const newMessagesHeight = scrollHeightAfter - scrollHeightBefore
        container.scrollTop += newMessagesHeight
      }, 0)
    } else {
      scrollToBottom()
    }
    previousChatsLength.current = chats.length
  }, [chats])

  // Sort chats by updatedAt in ascending order (oldest first)
  const sortedChats = chats.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))

  return (
    <Box
      id="chat-list"
      ref={chatListRef}
      display="flex"
      flexDirection="column"
      overflow="auto"
      p={2}
      height="100%" // Use full height of parent
    >
      {loading && chats.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      )}
      {loading && chats.length > 0 && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} />
        </Box>
      )}
      {sortedChats.map((chat, index) => (
        <div key={chat.id} ref={index === sortedChats.length - 1 ? lastMessageRef : null}>
          <ChatMessage message={chat.message} role={chat.role} file={chat.file} />
        </div>
      ))}
      {waitingResponse && <WaitingMessage />}
    </Box>
  )
}

export default ChatList
