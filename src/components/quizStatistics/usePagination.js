import { useState } from 'react'

const usePagination = (initialPage = 1, initialTotalPages = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(initialTotalPages)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
  }
}

export default usePagination
