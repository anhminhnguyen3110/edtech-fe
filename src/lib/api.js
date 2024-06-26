import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}`,
})

api.interceptors.request.use(
  async (config) => {
    if (config.authRequired && !config.headers['Authorization']) {
      const token = Cookies.get('accessToken')
      const refreshToken_cookie = Cookies.get('refreshToken')
      const tokenExpiry = Cookies.get('accessTokenExpiry')

      if (token && tokenExpiry) {
        const expiryDate = new Date(tokenExpiry)
        const now = new Date()

        if (expiryDate <= now && refreshToken) {
          try {
            console.log('Access token expired, attempting to refresh...')
            console.log('Using refresh token:', refreshToken_cookie)

            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/refresh-token`,
              {},
              {
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${refreshToken_cookie}`,
                },
              }
            )

            console.log('Refresh token response:', response.data)

            const { accessToken, expiresInMinutes } = response.data
            const newExpiryDate = new Date(new Date().getTime() + expiresInMinutes * 60 * 1000)

            Cookies.set('accessToken', accessToken, { expires: expiresInMinutes / 1440 })
            Cookies.set('refreshToken', refreshToken)
            Cookies.set('accessTokenExpiry', newExpiryDate.toISOString())

            config.headers['Authorization'] = `Bearer ${accessToken}`
          } catch (error) {
            console.error(
              'Failed to refresh access token',
              error.response ? error.response.data : error
            )
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            Cookies.remove('accessTokenExpiry')
            window.location.href = '/login'
            throw error
          }
        } else {
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api
