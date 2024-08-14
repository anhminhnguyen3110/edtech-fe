import React, { useEffect, useState, useRef } from 'react'
import { Typography } from '@mui/material'

const AutoShrinkText = ({ text, minFontSize = 11, maxFontSize = 18, ...props }) => {
  const [fontSize, setFontSize] = useState(maxFontSize)
  const textRef = useRef(null)

  useEffect(() => {
    const checkTextFit = () => {
      if (textRef.current) {
        const containerWidth = textRef.current.offsetWidth
        const textWidth = textRef.current.scrollWidth

        if (textWidth > containerWidth && fontSize > minFontSize) {
          setFontSize((prevSize) => Math.max(prevSize - 0.2, minFontSize))
        }
      }
    }

    checkTextFit()
    window.addEventListener('resize', checkTextFit)
    return () => window.removeEventListener('resize', checkTextFit)
  }, [fontSize, text, minFontSize])

  return (
    <Typography ref={textRef} style={{ fontSize: `${fontSize}px` }} {...props}>
      {text}
    </Typography>
  )
}

export default AutoShrinkText
