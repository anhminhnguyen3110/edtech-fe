import React from 'react'
import Link from '@mui/material/Link'

const MessageTooltip = ({ url, linkText }) => (
  <span>
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ color: 'white', textDecoration: 'underline' }}
    >
      {linkText}
    </Link>
  </span>
)

export default MessageTooltip
