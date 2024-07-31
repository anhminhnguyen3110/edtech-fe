import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'

const PlayerWebSocketContext = createContext(null)

export const usePlayerWebSocket = () => {
  return useContext(PlayerWebSocketContext)
}

export const PlayerWebSocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const [, setSocket] = useState(null) // Use state to trigger re-renders if necessary

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
    }

    const socketInstance = io(process.env.NEXT_PUBLIC_QUIZ_WEB_SOCKET_URL, {
      transports: ['websocket'],
    })

    socketInstance.on('connect', () => {
      console.log('Socket connected successfully')
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    socketInstance.on('connect_error', (err) => {
      console.error('Socket connection error:', err)
    })

    // Add any custom event listeners here
    socketInstance.on('HOST_DISCONNECTED', (data) => {
      console.log('HOST_DISCONNECTED', data)
    })

    socketRef.current = socketInstance
    setSocket(socketInstance) // Update state to trigger re-renders if needed
  }, [])

  useEffect(() => {
    initializeSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [initializeSocket])

  return (
    <PlayerWebSocketContext.Provider
      value={{ socket: socketRef.current, resetSocket: initializeSocket }}
    >
      {children}
    </PlayerWebSocketContext.Provider>
  )
}
