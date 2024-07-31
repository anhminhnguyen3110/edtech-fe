import '@/styles/globals.css'
import { AuthProvider } from '../context/authContext'
import { PlayerWebSocketProvider } from '@/context/playerWebSocketProvider'
import { HostWebSocketProvider } from '@/context/hostWebSocketProvider'
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthProvider>
      <PlayerWebSocketProvider>
        <HostWebSocketProvider>{getLayout(<Component {...pageProps} />)}</HostWebSocketProvider>
      </PlayerWebSocketProvider>
    </AuthProvider>
  )
}
