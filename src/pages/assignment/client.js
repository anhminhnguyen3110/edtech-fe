import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import SearchBar from '@/components/searchBar/searchBar'
import PaginationComponent from '@/components/pagination/pagination'
import AssessmentItem from '@/components/assessmentPage/assessmentItem'
import api from '@/lib/api'
import { BLUE, GRAY } from '@/theme/palette'
import MessageBox from '@/components/box/messageBox'
import CustomSnackbar from '@/components/snackBar/customSnackBar'
import YearDropdown from '@/components/assessmentPage/yearDropDown'
import { useRouter } from 'next/router'

export const AssessmentPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [assignments, setAssignments] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [errorMessage, setErrorMessage] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [year, setYear] = useState('')
  const router = useRouter()

  const fetchData = async (page = 1, searchQuery = '', selectedYear = '') => {
    try {
      const params = {
        page: page,
        limit: itemsPerPage,
        name: searchQuery,
      }

      if (selectedYear) {
        params.year = selectedYear
      }

      const response = await api.get('/assignments', {
        authRequired: true,
        params: params,
      })
      const { items, meta } = response.data
      console.log('Fetched data:', items)
      console.log('Meta data:', meta)
      setAssignments(items)
      setTotalPages(meta.totalPages)
      setCurrentPage(meta.currentPage)
      setErrorMessage(null)
    } catch (error) {
      console.error('Error fetching data:', error)
      setErrorMessage('Error while fetching data.')
      setOpenSnackbar(true)
    }
  }

  const handleSearch = async (value) => {
    await fetchData(1, value, year)
  }

  const handleChange = async (event, value) => {
    setCurrentPage(value)
    await fetchData(value, '', year)
  }

  const handleYearChange = async (event) => {
    const selectedYear = event.target.value
    setYear(selectedYear)
    await fetchData(1, '', selectedYear)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        marginBottom="32px"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: '600', marginBottom: isMobile ? '16px' : '0' }}
        >
          Assignments
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
        >
          <SearchBar placeholder="Search assignments..." onSearch={handleSearch} />
        </Box>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={errorMessage}
        severity="error"
      />
      {assignments.length === 0 ? (
        <MessageBox message="No assignments found." />
      ) : (
        <>
          <Box marginTop="32px">
            {assignments.map((assignment) => (
              <AssessmentItem key={assignment.id} assessment={assignment} />
            ))}
          </Box>
          <Box marginTop="32px" display="flex" justifyContent="center">
            <PaginationComponent count={totalPages} page={currentPage} onChange={handleChange} />
          </Box>
        </>
      )}
    </Container>
  )
}

export default AssessmentPage
