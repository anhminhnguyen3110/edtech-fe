import React from 'react'
import {
  Drawer,
  List,
  Toolbar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { GRAY } from '../../theme/palette'
import NavItem from './navItem'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AssistantIcon from '@mui/icons-material/Assistant'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
const navItems = [
  {
    name: 'AI Assistant',
    icon: <ChatOutlinedIcon sx={{ fontSize: '2rem' }} />,
    path: '/assistant',
  },
  {
    name: 'Quiz',
    icon: <SportsEsportsIcon sx={{ fontSize: '2rem' }} />,
    path: '/quiz',
  },
  {
    name: 'Assignment',
    icon: <AssessmentIcon sx={{ fontSize: '2rem' }} />,
    path: '/assignment',
  },
]

const DrawerStyled = styled(Drawer)(({ theme, open, drawerWidth }) => ({
  width: open ? drawerWidth : '72px', // Adjusted width for closed drawer
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : '72px', // Adjusted width for closed drawer
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: GRAY.semiLight,
  },
}))

const DrawerContent = ({ open, drawerWidth, onClose, listRef }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <DrawerStyled
      theme={theme}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={open}
      drawerWidth={drawerWidth}
      onClose={onClose}
    >
      <Toolbar />
      <List ref={listRef}>
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} open={open} />
        ))}
      </List>
    </DrawerStyled>
  )
}

export default DrawerContent
