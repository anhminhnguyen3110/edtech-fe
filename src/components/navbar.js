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

function Navbar() {
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
        {['Overview', 'Join Quiz', 'Sign In'].map((text) => (
          <ListItem button key={text} onClick={() => setMobileOpen(false)}>
            <ListItemText primary={text} />
          </ListItem>
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
            <Box
              component="img"
              src="./edtech-logo.png"
              alt="edtech logo"
              sx={{ height: { xs: '30px', md: '40px' } }}
            />
          </Typography>
          {/* Display the links centered */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <NavItem text="Overview" active={true} link="/" />
            <NavItem text="Join Quiz" active={false} link="/" />
            <NavItem text="Sign In" active={false} link="/auth" />
          </Stack>
          {/* Display the menu icon only on small screens */}
          <IconButton
            color="#686868"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
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

export default Navbar
