import React from 'react'
import { Typography, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BLUE } from '@/theme/palette'

const AssistantAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: BLUE.main,
  width: theme.spacing(6),
  height: theme.spacing(6),
}))

export default AssistantAvatar
