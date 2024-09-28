import React, { createContext, useContext, useState } from 'react'

// Create the context
const SelectedStudentsContext = createContext()

// Custom hook to use the context
export const useSelectedStudents = () => useContext(SelectedStudentsContext)

// Provider component
export const SelectedStudentsProvider = ({ children }) => {
  const [selectedStudents, setSelectedStudents] = useState({}) // Object to store students and their games
  const [error, setError] = useState(null) // State to track error messages
  const [openSlider, setOpenSlider] = useState(false)
  // Add game for a student
  const addGame = (player, game) => {
    const { nickname } = player

    // Check if the game already exists in any student's list
    const isGameAlreadyAdded = Object.values(selectedStudents).some((studentData) =>
      studentData.games.some((g) => g.gameId === game.gameId)
    )

    if (isGameAlreadyAdded) {
      // Set the error message if the game is already added
      setError(`Game "${game.quizName}" on this date is already selected for another student.`)
      return
    }
    console.log('Adding game:', game)

    setSelectedStudents((prev) => {
      const studentData = prev[nickname] ? prev[nickname] : { player, games: [] }
      const games = studentData.games

      if (!games.some((g) => g.gameId === game.gameId)) {
        // Add the game if it's not already added for this student
        return {
          ...prev,
          [nickname]: {
            ...studentData,
            games: [...games, game], // Add game to the student's game list
          },
        }
      }
      return prev // Return unchanged if the game is already added
    })
  }

  // Remove game for a student
  const removeGame = (nickname, gameId) => {
    setSelectedStudents((prev) => {
      const studentData = prev[nickname]
      if (!studentData) return prev // If student not found, return unchanged

      const updatedGames = studentData.games.filter((g) => g.gameId !== gameId)

      // If no games left, remove the student from the list
      if (updatedGames.length === 0) {
        const { [nickname]: removed, ...rest } = prev
        return rest
      }

      // Update the student's games
      return {
        ...prev,
        [nickname]: {
          ...studentData,
          games: updatedGames,
        },
      }
    })
  }

  // Clear error function
  const clearError = () => {
    setError(null)
  }
  const closeSlider = () => {
    setOpenSlider(false)
  }
  const handleOpenSlider = () => {
    setOpenSlider(true)
  }

  // Context value
  const contextValue = {
    selectedStudents,
    addGame,
    removeGame,
    error, // Expose error to the context consumers
    clearError, // Expose function to clear the error
    openSlider,
    closeSlider,
    handleOpenSlider,
  }

  return (
    <SelectedStudentsContext.Provider value={contextValue}>
      {children}
    </SelectedStudentsContext.Provider>
  )
}
