import NavBarLanding from '@/components/navbar/navBarLanding'
import LandingBody from '@/components/landingPage/landingBody'
import Footer from '@/components/footer/footer'
import Page from '@/components/page'
import withNonAuth from '@/hoc/withNonAuth'

const HomePage = () => (
  <div className="app">
    <Page title="EdTech Assistant" description="EdTech Assistant" />
    <NavBarLanding />
    <LandingBody />
  </div>
)

export default withNonAuth(HomePage)
