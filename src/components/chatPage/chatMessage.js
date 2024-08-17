import React from 'react'
import { Box, Link, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material'
import { AttachFile } from '@mui/icons-material'
import { BLUE, GRAY } from '@/theme/palette'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SchoolIcon from '@mui/icons-material/School'
import CodeBlock from './codeBlock'
import {
  MarkdownTable,
  MarkdownTableHead,
  MarkdownTableBody,
  MarkdownTableRow,
  MarkdownTableCell,
} from './markDownTable' // Import the new MarkdownTable component

const ChatMessage = ({ message, role, file }) => {
  const isUser = role === 'user'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const cleanedMessage = message
    .replace('Reference: [No relevant document context provided]', '')
    .replace(/\n/g, '  \n')

  return (
    <Box
      display="flex"
      flexDirection={isUser ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      maxWidth="100%"
      mb={2}
    >
      {!isTablet && (
        <Avatar
          sx={{
            bgcolor: isUser ? BLUE.main : GRAY.main,
            width: '2.5rem',
            height: '2.5rem',
            mr: isUser ? 0 : 1,
            ml: isUser ? 1 : 0,
          }}
        >
          {isUser ? <AccountCircleIcon /> : <SchoolIcon />}
        </Avatar>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isUser ? 'flex-end' : 'flex-start'}
        maxWidth={isMobile ? '100%' : '70%'}
      >
        {file && (
          <Box
            display="flex"
            alignItems="center"
            maxWidth="100%"
            bgcolor={GRAY.light}
            borderRadius="10px"
            p={1.5}
            mb={1}
          >
            <AttachFile style={{ color: '#ff4081', marginRight: '8px' }} />
            <Box>
              <Link href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {file.fileName}
                </Typography>
              </Link>
            </Box>
          </Box>
        )}
        <Box
          maxWidth="100%"
          width="fit-content"
          bgcolor={isUser ? BLUE.dark : '#f0f0f0'}
          color={isUser ? 'white' : 'black'}
          borderRadius="10px"
          p={2}
          sx={{
            wordBreak: 'break-word',
            '& ul, & ol': {
              paddingLeft: '1.5em',
              margin: 0,
            },
            '& li': {
              marginBottom: '0.5em',
            },
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
              h1: ({ node, ...props }) => <Typography variant="h5" component="h1" {...props} />,
              h2: ({ node, ...props }) => <Typography variant="h6" component="h2" {...props} />,
              h3: ({ node, ...props }) => (
                <Typography variant="subtitle1" component="h3" {...props} />
              ),
              li: ({ node, ...props }) => (
                <Typography component="li" {...props} style={{ marginBottom: '0.5em' }} />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} style={{ margin: 0, paddingLeft: '1.2em' }} />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} style={{ margin: 0, paddingLeft: '1.2em' }} />
              ),
              code: CodeBlock,
              table: MarkdownTable,
              thead: MarkdownTableHead,
              tbody: MarkdownTableBody,
              tr: MarkdownTableRow,
              th: (props) => <MarkdownTableCell isHeader {...props} />,
              td: (props) => <MarkdownTableCell {...props} />,
            }}
          >
            {cleanedMessage}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatMessage
