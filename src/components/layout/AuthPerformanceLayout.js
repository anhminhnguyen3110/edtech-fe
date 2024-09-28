import React, { useState, useRef } from 'react'
import { CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useAuth } from '../../context/authContext'
import AppBarPerformance from '../navbar/appBarPerformance'
import DrawerContent from '../navbar/drawerContent'
import withAuth from '../../hoc/withAuth'

const drawerWidth = 200

const AuthPerformanceLayout = ({ children }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const listRef = useRef(null)
  const { logout } = useAuth()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <CssBaseline />
      <AppBarPerformance open={open} toggleDrawer={toggleDrawer} logout={logout} />
      <div style={{ display: 'flex', flexGrow: 1, zIndex: 1 }}>
        <DrawerContent
          open={open}
          drawerWidth={drawerWidth}
          onClose={toggleDrawer}
          listRef={listRef}
        />
        <main
          style={{
            flexGrow: 1,
            paddingTop: '50px',
            paddingBottom: '8px',
            marginLeft: isMobile || open ? '0px' : '0px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <Toolbar /> */}
          <div style={{ flexGrow: 1 }}>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default withAuth(AuthPerformanceLayout)
