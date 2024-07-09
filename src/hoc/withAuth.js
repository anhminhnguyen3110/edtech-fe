import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { isAuthenticated, loading } = useAuth()
    const Router = useRouter()
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    console.log('isAuthenticated:', isAuthenticated)
    console.log('loading:', loading)
    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          Router.replace('/auth')
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

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`
  return WithAuthComponent
}

export default withAuth
