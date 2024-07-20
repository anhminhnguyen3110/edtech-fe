import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { BLUE } from '@/theme/palette'
const YearDropdown = ({ year, onYearChange, isMobile }) => {
  return (
    <FormControl
      sx={{
        minWidth: 160,
        marginLeft: isMobile ? '0' : '16px',
        marginTop: isMobile ? '16px' : '0',
      }}
    >
      <InputLabel sx={{ color: 'primary.main' }}>Year</InputLabel>
      <Select
        value={year}
        onChange={onYearChange}
        label="Year"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.light',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: BLUE.main,
          },
        }}
      >
        <MenuItem value="">All Years</MenuItem>
        <MenuItem value="FOUNDATION">FOUNDATION</MenuItem>
        {[...Array(12).keys()].map((i) => (
          <MenuItem key={i} value={`YEAR ${i + 1}`}>{`YEAR ${i + 1}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default YearDropdown
