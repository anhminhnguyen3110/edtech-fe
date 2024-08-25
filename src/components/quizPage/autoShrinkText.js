import React, { useEffect, useState, useRef } from 'react'
import { Typography } from '@mui/material'

const AutoShrinkText = ({ text, minFontSize = 11, maxFontSize = 18, ...props }) => {
  const [fontSize, setFontSize] = useState(maxFontSize)
  const textRef = useRef(null)

  useEffect(() => {
    const checkTextFit = () => {
      if (textRef.current) {
        const containerWidth = textRef.current.offsetWidth
        const containerHeight = textRef.current.offsetHeight
        const textWidth = textRef.current.scrollWidth
        const textHeight = textRef.current.scrollHeight

        if (
          (textWidth > containerWidth || textHeight > containerHeight) &&
          fontSize > minFontSize
        ) {
          setFontSize((prevSize) => Math.max(prevSize - 0.5, minFontSize))
        }
      }
    }

    checkTextFit()
    window.addEventListener('resize', checkTextFit)
    return () => window.removeEventListener('resize', checkTextFit)
  }, [fontSize, text, minFontSize])

  return (
    <Typography
      ref={textRef}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: 1.2,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      {text}
    </Typography>
  )
}

export default AutoShrinkText
