import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { BLUE, GRAY } from '@/theme/palette'

const SearchBar = ({ placeholder = 'Search', onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    setSearchValue(value) // Update searchValue state
    if (onSearch) {
      onSearch(value.trim()) // Trigger search with trimmed value
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        sx={{
          margin: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: GRAY.light, // Default border color
            },
            '&:hover fieldset': {
              borderColor: BLUE.main, // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: BLUE.main, // Border color when focused
            },
          },
        }}
      />
    </Box>
  )
}

export default SearchBar
