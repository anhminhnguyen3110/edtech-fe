import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '../lib/api'
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const Router = useRouter()

  useEffect(() => {
    const token = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    const tokenExpiry = Cookies.get('accessTokenExpiry')
    console.log('Token:', token)
    console.log('Token expiry:', Cookies.get('accessTokenExpiry'))
    if (token && tokenExpiry) {
      const now = new Date()
      const expiryDate = new Date(tokenExpiry)
      if (expiryDate > now) {
        setAccessToken(token)
        setIsAuthenticated(true)
      } else if (refreshToken) {
        refreshAccessToken()
      }
    }

    const interval = setInterval(() => {
      const now = new Date()
      const expiryDate = new Date(Cookies.get('accessTokenExpiry'))
      console.log('Checking token expiry...')
      if (Cookies.get('refreshToken')) {
        console.log('Refresh token:', Cookies.get('refreshToken'))
        refreshAccessToken()
      }
      if (expiryDate <= now && refreshToken) {
      }
    }, 1 * 15 * 1000) // Adjust interval as needed

    return () => clearInterval(interval)
  }, [])

  const login = (accessToken, refreshToken, expiresInMinutes) => {
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresInMinutes * 60 * 1000)

    Cookies.set('accessToken', accessToken, { expires: expiresInMinutes / 1440 }) // Cookie expiry in days
    Cookies.set('refreshToken', refreshToken) // Adjust expiry as needed
    Cookies.set('accessTokenExpiry', expirationDate.toISOString())
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setIsAuthenticated(true)
    Router.push('/')
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('accessTokenExpiry')
    setAccessToken(null)
    setRefreshToken(null)
    setIsAuthenticated(false)
    Router.push('/auth')
  }

  const refreshAccessToken = async () => {
    console.log('Refreshing access token...')
    console.log('Refresh token:', Cookies.get('refreshToken'))
    console.log('Access token:', Cookies.get('accessToken'))
    try {
      const response = await api.post(
        '/auth/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('refreshToken')}`,
          },
        }
      )
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/refresh-token`, {}, {
      //     headers: {
      //     'accept': 'application/json',
      //     'Authorization': `Bearer ${Cookies.get('refreshToken')}`
      //     }
      // })
      console.log('Refresh token response:', response.data)
      const { accessToken, expiresInMinutes, refreshToken } = response.data
      const now = new Date()
      const expirationDate = new Date(now.getTime() + expiresInMinutes * 60 * 1000)
      console.log('after refresh token response')
      Cookies.set('accessToken', accessToken, { expires: expiresInMinutes / 1440 })
      Cookies.set('refreshToken', refreshToken)
      Cookies.set('accessTokenExpiry', expirationDate.toISOString())
      console.log('Access token refreshed:', Cookies.get('accessToken'))
      console.log('Refresh token refreshed:', Cookies.get('refreshToken'))
      setAccessToken(accessToken)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to refresh access token', error)
      logout()
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
