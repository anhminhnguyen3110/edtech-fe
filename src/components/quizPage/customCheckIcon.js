import React from 'react'
import { SvgIcon } from '@mui/material'

const CustomCheckIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M10 15.172l-3.95-3.95-1.414 1.414L10 18l9.364-9.364-1.414-1.414z"
      fill="none"
      stroke="white"
      strokeWidth="2.0" // Set this value higher to make the check mark thicker
    />
  </SvgIcon>
)

export default CustomCheckIcon
