import React from 'react'
import { IconButton, Box } from '@mui/material'
import { Check } from '@mui/icons-material'

const CustomTickButton = ({ selected, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 48,
        height: 48,
        margin: '3px',
        backgroundColor: selected ? 'lightgreen' : 'inherit',
        borderRadius: '50%',
        border: selected ? '2px solid green' : '1px solid grey',
        '&:hover': {
          backgroundColor: selected ? 'lightgreen' : 'lightgrey',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {selected && <Check sx={{ color: 'green' }} />}
    </IconButton>
  )
}

export default CustomTickButton
