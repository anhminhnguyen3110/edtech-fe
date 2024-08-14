import React, { useState } from 'react'
import { Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '17rem', // Adjust the width to make the bar longer
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: GRAY.dark, // Default border color
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
