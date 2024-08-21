import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '90vw',
  overflowX: 'auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  width: '100%', // Ensure the container doesn't exceed the parent width
  '& .MuiTable-root': {
    borderCollapse: 'separate',
    borderSpacing: 0,
    width: 'max-content', // Allow table to grow based on content
    minWidth: '100%', // Ensure table is at least as wide as its container
  },
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.common.black,
    fontWeight: 700,
    whiteSpace: 'nowrap', // Prevent wrapping in header
    padding: theme.spacing(2),
  },
  '& .MuiTableCell-body': {
    fontSize: 14,
    whiteSpace: 'normal', // Allow wrapping in body cells
    maxWidth: '200px',
    wordBreak: 'break-word', // Break long words
    overflowWrap: 'break-word', // Ensure content wraps within the cell
    padding: theme.spacing(2),
  },
  '& .MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

const MarkdownTable = ({ children, ...props }) => {
  return (
    <StyledTableContainer component={Paper} elevation={3} {...props}>
      <Table>{children}</Table>
    </StyledTableContainer>
  )
}

const MarkdownTableHead = ({ children, ...props }) => {
  return (
    <TableHead sx={{ maxWidth: '90vw' }} {...props}>
      {children}
    </TableHead>
  )
}

const MarkdownTableBody = ({ children, ...props }) => {
  return (
    <TableBody sx={{ maxWidth: '90vw' }} {...props}>
      {children}
    </TableBody>
  )
}

const MarkdownTableRow = ({ children, ...props }) => {
  return (
    <TableRow sx={{ maxWidth: '90vw' }} {...props}>
      {children}
    </TableRow>
  )
}

const MarkdownTableCell = ({ isHeader = false, children, ...props }) => {
  return (
    <TableCell sx={{ maxWidth: '90vw' }} component={isHeader ? 'th' : 'td'} {...props}>
      {children}
    </TableCell>
  )
}

export { MarkdownTable, MarkdownTableHead, MarkdownTableBody, MarkdownTableRow, MarkdownTableCell }
