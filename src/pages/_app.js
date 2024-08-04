import '@/styles/globals.css'
import { AuthProvider } from '../context/authContext'
import { PlayerWebSocketProvider } from '@/context/playerWebSocketProvider'
import { HostWebSocketProvider } from '@/context/hostWebSocketProvider'
import { HistoryProvider } from '@/context/historyContext'
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthProvider>
      <HistoryProvider>
        <PlayerWebSocketProvider>
          <HostWebSocketProvider>{getLayout(<Component {...pageProps} />)}</HostWebSocketProvider>
        </PlayerWebSocketProvider>
      </HistoryProvider>
    </AuthProvider>
  )
}
