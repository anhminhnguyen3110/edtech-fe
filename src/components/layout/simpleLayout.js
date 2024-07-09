// components/SimpleLayout.js
import React from 'react'
import { AppBar, Toolbar, CssBaseline, Typography } from '@mui/material'

const SimpleLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Simple Layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: 64, padding: 24 }}>{children}</main>
    </div>
  )
}

export default SimpleLayout
