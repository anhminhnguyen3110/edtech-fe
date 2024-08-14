import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, useTheme, Grid } from '@mui/material'
import PaginationComponent from '@/components/pagination/pagination'
import IssueItem from '@/components/classAssignmentPage/issueItem' // Ensure the correct import path
import ButtonComponent from '@/components/button/buttonComponent'
import MessageBox from '@/components/box/messageBox' // Ensure the correct import path
import AddIssueModal from '@/components/classAssignmentPage/addIssueModal' // Ensure the correct import path
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
const CommonIssueList = ({ issues, maxAssignments, onEditIssue, onDeleteIssue, onAddIssue }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile-sized
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditing, setIsEditing] = useState(false) // General edit state
  const [openModal, setOpenModal] = useState(false) // State to control the modal

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const onEditClick = () => {
    setIsEditing((prev) => !prev) // Toggle the edit state
  }

  return (
    <Box
      sx={{ padding: '24px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}
    >
      <Box>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '16px' }}>
              Issues
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm="auto"
            sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2 }}
          >
            <ButtonComponent
              onClick={handleOpenModal}
              sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <AddIcon sx={{ marginRight: '8px' }} />
              Add Issue
            </ButtonComponent>
            {issues.length > 0 && (
              <ButtonComponent
                onClick={onEditClick}
                sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <EditIcon sx={{ marginRight: '8px' }} />
                {isEditing ? 'Finish Editing' : 'Edit Issues'}
              </ButtonComponent>
            )}
          </Grid>
        </Grid>
      </Box>
      {issues.length === 0 ? (
        <MessageBox message="There are no issues to display. Extract to continue!" />
      ) : (
        <>
          {issues.map((issue) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              maxAssignments={maxAssignments}
              isEditing={isEditing}
              onEditIssue={onEditIssue}
              onDeleteIssue={onDeleteIssue}
            />
          ))}
        </>
      )}
      <AddIssueModal
        open={openModal}
        handleClose={handleCloseModal}
        maxAssignments={maxAssignments}
        onAddIssue={onAddIssue}
      />
    </Box>
  )
}

export default CommonIssueList
