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

        if (expiryDate <= now && Cookies.get('refreshToken')) {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/refresh-token`,
              {},
              {
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${Cookies.get('refreshToken')}`,
                },
              }
            )

            const { accessToken, expiresInMinutes } = response.data
            const newExpiryDate = new Date(new Date().getTime() + expiresInMinutes * 60 * 1000)

            Cookies.set('accessToken', accessToken, { expires: expiresInMinutes / 1440 })
            Cookies.set('accessTokenExpiry', newExpiryDate.toISOString())

            config.headers['Authorization'] = `Bearer ${accessToken}`
          } catch (error) {
            console.error('Failed to refresh access token', error)
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
