import React from 'react'
import { IconButton, Badge } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { useSelectedStudents } from './selectedStudentsContext'
const PeopleIconButton = ({ icon, onClick }) => {
  const { selectedStudents, handleOpenSlider } = useSelectedStudents()
  const handlePeopleIconClick = () => {
    console.log('People icon clicked')
    handleOpenSlider()
  }
  return (
    <IconButton color="inherit" onClick={handlePeopleIconClick}>
      <Badge
        badgeContent={Object.values(selectedStudents).length}
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '0.6rem',
            minWidth: '15px',
            height: '15px',
            padding: '0 3px',
            right: 3,
            top: 3,
          },
        }}
      >
        <PeopleAltIcon />
      </Badge>
    </IconButton>
  )
}

export default PeopleIconButton
