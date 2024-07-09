// components/ButtonComponent.js
import React from 'react'
import { Button } from '@mui/material'
import { BLUE } from '../../theme/palette' // Import your custom color

const ButtonComponent = ({ variant, children, onClick, style }) => {
  return (
    <Button
      variant={variant}
      style={{ backgroundColor: BLUE.main, color: 'white', ...style }} // Use BLUE.main for the background color
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
