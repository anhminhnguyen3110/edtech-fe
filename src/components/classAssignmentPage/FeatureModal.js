import React from 'react'
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const FeatureModal = ({ open, handleClose }) => {
  const onClose = () => {
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: 'blur(3px)' },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            minWidth: 320,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2.5,
            borderRadius: '16px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            Usage Instructions
          </Typography>

          <List>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Extracting the issue process can take up to 15 minutes. Once you click the 'Extract Issues' button, you can attend to other tasks before coming back." />
            </ListItem>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="To use the automatic issue extraction feature, there must be no issues listed." />
            </ListItem>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Once you use the issue extraction feature, it cannot be reused within a 2-hour window." />
            </ListItem>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="To generate a quiz or lesson using our model, you must first extract issues with our tool or manually add issues." />
            </ListItem>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="A maximum of 10 issues can be identified for a class in an assignment." />
            </ListItem>
            <ListItem sx={{ mb: 1, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: '4px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="A maximum of 5 lessons is allowed per assignment for a class. If you want to create a new lesson, you need to delete an old one before proceeding." />
            </ListItem>
          </List>
        </Box>
      </Fade>
    </Modal>
  )
}

export default FeatureModal
