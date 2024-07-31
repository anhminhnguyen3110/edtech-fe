// context/hostWebSocketProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const WebSocketContext = createContext(null)

export const useHostWebSocket = () => {
  return useContext(WebSocketContext)
}

export const HostWebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
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

    setSocket(socketInstance)

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [])

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>
}
