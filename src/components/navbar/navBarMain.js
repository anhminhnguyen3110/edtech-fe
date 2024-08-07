import React, { useState, useRef } from 'react'
import { Drawer, List, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { GRAY } from '../../theme/palette'
import NavItem from './navItem'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AppBarMain from './appBarMain'

const navItems = [
  {
    name: 'Assessments',
    icon: <AssessmentIcon sx={{ fontSize: '2rem' }} />,
    path: '/',
  },
  {
    name: 'Quiz',
    icon: <SportsEsportsIcon sx={{ fontSize: '2rem' }} />,
    path: '/quiz',
  },
  {
    name: 'A',
    icon: <SportsEsportsIcon sx={{ fontSize: '2rem' }} />,
    path: '/quiz',
  },
]

const DrawerStyled = styled(Drawer)(({ theme, open, drawerWidth }) => ({
  width: open ? drawerWidth : 'fit-content',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: 'width 0.3s ease',
  overflowX: 'hidden',
  backgroundColor: GRAY.semiLight,
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : 'fit-content',
    transition: 'width 0.3s ease',
    overflowX: 'hidden',
    backgroundColor: GRAY.semiLight,
  },
}))

const drawerWidth = 200

const NavBarMain = ({ children }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const listRef = useRef(null)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarMain open={open} toggleDrawer={toggleDrawer} />
      <DrawerStyled
        theme={theme}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        drawerWidth={drawerWidth}
        onClose={toggleDrawer}
      >
        <Toolbar />
        <List ref={listRef}>
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} open={open} />
          ))}
        </List>
      </DrawerStyled>
      <main
        style={{
          flexGrow: 1,
          padding: '24px',
          marginLeft: isMobile || open ? '0px' : '64px',
        }}
      >
        <Toolbar />
        {children}
      </main>
    </div>
  )
}

export default NavBarMain
