import React, { useState, useEffect, useRef } from 'react'

const useActive = (time) => {
  const [active, setActive] = useState(false)
  const timer = useRef(null)

  const startTimer = () => {
    console.log('Hover started, setting timer...')
    timer.current = window.setTimeout(() => {
      setActive(true)
      console.log('Hover time exceeded, setting active to true')
    }, time)
  }

  const resetTimer = () => {
    if (timer.current) {
      console.log('Hover stopped, clearing timer')
      window.clearTimeout(timer.current)
    }
    setActive(false)
  }

  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current)
        console.log('Component unmounted, clearing timer')
      }
    }
  }, [time])

  return { active, startTimer, resetTimer }
}

export default useActive
