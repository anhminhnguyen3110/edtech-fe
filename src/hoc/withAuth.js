import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { isAuthenticated } = useAuth()
    const Router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace('/login')
      }
    }, [Router, isAuthenticated])

    if (isAuthenticated) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`
  return WithAuthComponent
}

export default withAuth
