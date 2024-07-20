import React from 'react'
import { IconButton } from '@mui/material'
import CustomCheckIcon from './customCheckIcon' // Adjust the import path as necessary

const CustomTickButton = ({ selected, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 40,
        height: 40,
        margin: '3px',
        backgroundColor: selected ? 'lightgreen' : 'inherit',
        borderRadius: '50%',
        border: selected ? 'none' : '1px solid grey',
        '&:hover': {
          backgroundColor: selected ? 'lightgreen' : 'lightgrey',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {selected && <CustomCheckIcon sx={{ fontSize: '2rem' }} />}
    </IconButton>
  )
}

export default CustomTickButton
