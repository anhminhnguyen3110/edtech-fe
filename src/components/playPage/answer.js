/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, useMediaQuery } from '@mui/material'
import { BACKGROUND_ANSWER, TRUE_FALSE_ANSWER } from '@/theme/palette'
import CustomTickButton from '../quizPage/customTickButton'
import { BLUE } from '@/theme/palette'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AcUnitIcon from '@mui/icons-material/AcUnit'

const Answer = ({ question, answerQuestion, handleTimesUp }) => {
  const { choices, questionType, timeLimitInSecond } = question
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [remainingTime, setRemainingTime] = useState(timeLimitInSecond)

  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const isMediumScreen = useMediaQuery('(max-width:900px)')

  const iconSize = isSmallScreen ? '3rem' : isMediumScreen ? '4rem' : '6rem'

  const icons = [
    <RadioButtonUncheckedIcon key={1} sx={{ fontSize: iconSize }} />,
    <CropSquareIcon key={2} sx={{ fontSize: iconSize }} />,
    <AcUnitIcon key={3} sx={{ fontSize: iconSize }} />,
    <StarBorderIcon key={4} sx={{ fontSize: iconSize }} />,
  ]

  const handleSelectAnswer = (choice) => {
    if (questionType === 'MULTIPLE_OPTIONS') {
      setSelectedAnswers((prevSelected) => {
        if (prevSelected.includes(choice)) {
          return prevSelected.filter((item) => item !== choice)
        }
        return [...prevSelected, choice]
      })
    } else {
      setSelectedAnswers([choice])
    }
  }

  useEffect(() => {
    if (questionType !== 'MULTIPLE_OPTIONS' && selectedAnswers.length > 0) {
      handleSubmit()
    }
  }, [selectedAnswers])

  const handleSubmit = () => {
    answerQuestion(selectedAnswers)
  }

  const calculateFontSize = (choiceLength) => {
    if (choiceLength > 50) return '1.5rem'
    if (choiceLength > 30) return '2rem'
    return '2.5rem'
  }

  const calculatePadding = (choiceLength) => {
    if (choiceLength > 50) return 2
    if (choiceLength > 30) return 3
    return 4
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleTimesUp()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Box
      sx={{
        p: 4,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'white',
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {choices.map((choice, index) => (
          <Grid item xs={6} key={index} sx={{ textAlign: 'center', position: 'relative' }}>
            <Button
              variant="contained"
              onClick={() => handleSelectAnswer(choice)}
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor:
                  questionType === 'TRUE_FALSE'
                    ? TRUE_FALSE_ANSWER[index % 2]
                    : BACKGROUND_ANSWER[index % BACKGROUND_ANSWER.length],
                color: '#fff',
                fontSize: calculateFontSize(choice.length),
                borderRadius: '15px',
                p: calculatePadding(choice.length),
                position: 'relative',
              }}
            >
              {icons[index]}
            </Button>
            {questionType === 'MULTIPLE_OPTIONS' && (
              <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                <CustomTickButton
                  selected={selectedAnswers.includes(choice)}
                  onClick={() => handleSelectAnswer(choice)}
                />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
      {questionType === 'MULTIPLE_OPTIONS' && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ background: BLUE.main }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Answer
