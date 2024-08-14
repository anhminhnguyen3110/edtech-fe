import React from 'react'
import { Typography, Box, IconButton, Tooltip, useMediaQuery } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useTheme } from '@mui/material/styles'
import { BLUE, GRAY } from '@/theme/palette'

const CodeBlock = ({ className, children, inline }) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] = React.useState(null)
  const [style, setStyle] = React.useState(null)
  const [copied, setCopied] = React.useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is small

  React.useEffect(() => {
    ;(async () => {
      const { Prism } = await import('react-syntax-highlighter')
      const { vscDarkPlus } = await import('react-syntax-highlighter/dist/esm/styles/prism')
      setSyntaxHighlighter(() => Prism)
      const modifiedStyle = {
        ...vscDarkPlus,
        'pre[class*="language-"]': {
          ...vscDarkPlus['pre[class*="language-"]'],
          margin: '0', // Override margin to 0
          fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for mobile
        },
      }
      setStyle(modifiedStyle)
    })()
  }, [isMobile])

  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1].toUpperCase() : 'CODE'

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset copied state after 2 seconds
  }

  return !inline && match && SyntaxHighlighter ? (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        overflowX: 'auto', // Allow horizontal scrolling on overflow
        overflowY: 'hidden', // Prevent vertical scrolling
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        maxWidth: '90vw',
        width: '100%', // Ensure the block takes the full width of the parent
      }}
    >
      <Box
        sx={{
          backgroundColor: '#2f2f2f',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0.3rem 0.5rem' : '0.5rem 1rem', // Adjust padding for mobile
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        <Typography
          variant="body3"
          component="span"
          sx={{ color: GRAY.semiLight, fontSize: '0.8rem' }}
        >
          {language}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy'}>
          <IconButton onClick={handleCopy} size="small" sx={{ color: '#fff' }}>
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          backgroundColor: '#2d2d2d',
          padding: 0,
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
          margin: 0,
        }}
      >
        <SyntaxHighlighter style={style} language={match[1]} PreTag="div">
          {children.replace(/\n$/, '')}
        </SyntaxHighlighter>
      </Box>
    </Box>
  ) : (
    <Typography
      component="code"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: isMobile ? '0.1em 0.3em' : '0.2em 0.4em', // Adjust padding for mobile
        borderRadius: '3px',
        fontFamily: 'Monaco, monospace',
        display: 'block',
        whiteSpace: 'pre-wrap', // Ensure long lines wrap on smaller screens
        wordBreak: 'break-word', // Break long words to fit smaller screens
        fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for mobile
      }}
    >
      {children}
    </Typography>
  )
}

export default CodeBlock
