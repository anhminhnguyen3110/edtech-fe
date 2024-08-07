// contexts/HistoryContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
  const [previousPath, setPreviousPath] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      setPreviousPath(window.location.pathname)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return <HistoryContext.Provider value={{ previousPath }}>{children}</HistoryContext.Provider>
}

export const useHistory = () => useContext(HistoryContext)
