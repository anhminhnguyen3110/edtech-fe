import SignIn from '@/components/signInPage/signIn'
import Page from '@/components/page'

const SignInPage = () => {
  return (
    <div className="app">
      <Page title="Sign In" description="Sign In to EdTech Assistant" />
      <SignIn />
    </div>
  )
}

export default SignInPage
