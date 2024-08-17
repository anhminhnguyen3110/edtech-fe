import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NavItem from './customLink'
import Link from 'next/link'
import { BLUE, GRAY } from '../../theme/palette'
function NavBarLanding() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Drawer items could also be transformed into links in the future
  const drawer = (
    <div>
      <List>
        {[
          { text: 'Join Quiz', link: '/join' },
          { text: 'Sign In', link: '/auth' },
        ].map((item, index) => (
          <Link href={item.link} passHref key={index}>
            <ListItem button component="a" onClick={() => setMobileOpen(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ mx: { xs: 0, md: 15 }, p: { xs: 1, md: 2 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            <Link href="/" passHref>
              <Box
                component="img"
                src="./edtech-logo.png"
                alt="edtech logo"
                sx={{ height: { xs: '40px', md: '55px' }, cursor: 'pointer' }}
              />
            </Link>
          </Typography>
          {/* Display the links centered */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <NavItem text="Join Quiz" active={false} link="/join" />
            <NavItem text="Sign In" active={false} link="/auth" />
          </Stack>
          {/* Display the menu icon only on small screens */}
          <IconButton
            color={GRAY['light']}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: 'block', sm: 'none' },
              '&:hover': {
                color: BLUE['light'],
              },
              transition: '0.3s ease',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  )
}

export default NavBarLanding
