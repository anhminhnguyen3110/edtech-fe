import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const withNonAuth = (WrappedComponent) => {
  const WithNonAuthComponent = (props) => {
    const { isAuthenticated, loading } = useAuth()
    const Router = useRouter()
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
      if (!loading) {
        if (isAuthenticated) {
          Router.replace('/')
        } else {
          setIsCheckingAuth(false)
        }
      }
    }, [Router, isAuthenticated, loading])

    if (loading || isCheckingAuth) {
      return null // Return null to avoid rendering the component while checking auth
    }

    return <WrappedComponent {...props} />
  }

  WithNonAuthComponent.displayName = `WithNonAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`
  return WithNonAuthComponent
}

export default withNonAuth
