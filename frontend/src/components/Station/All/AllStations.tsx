import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { Box, Link, TableFooter, TablePagination, useMediaQuery } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { getAllStations } from '../../../redux/methods/stationMethods'
import theme from '../../Ui/theme'
import { StyledTableCell, StyledTableRow } from '../../Ui/tableStyles'
import TablePaginationActions from '../../Ui/TablePaginationActions'
import { NavLink } from 'react-router-dom'
import Search from '../../Search/Search'
import ErrorAlert from '../../Ui/ErrorAlert'

function AllStations() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [searchKeyWord, setSearch] = useState('')
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { stations, totalStations, isLoading, isError } = useAppSelector((state) => state.station)
  const dispatch = useAppDispatch()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    const filter = {
      searchKeyWord: searchKeyWord,
      pageNumber: page + 1,
    }

    dispatch(getAllStations(filter))
  }, [page, searchKeyWord])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalStations) : 0

  return (
    <>
      {isError && !isLoading && <ErrorAlert message={isError.message} />}

      <Box
        sx={{
          '& .MuiTextField-root': { m: 2, width: '20ch', marginLeft: '68%', marginTop: '6%' },

          [theme.breakpoints.down('sm')]: {
            '& .MuiTextField-root': { m: 1, width: '13ch', marginTop: '8%' },
            textAlign: 'end',
            marginLeft: '0',
          },
        }}
      >
        <Search setSearch={setSearch} />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          margin: '0 auto 120px auto',
          width: '60%',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            marginTop: '0',
            width: '100%',
            marginBottom: '9%',
            borderRadius: '0',
            boxShadow: 'none',
          },
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                Name
              </StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>City</StyledTableCell>
              {!matches && <StyledTableCell align='center'>Capacity</StyledTableCell>}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {stations.length > 0 &&
              stations.map((s) => (
                <StyledTableRow key={s.fid}>
                  <StyledTableCell component='th' scope='row'>
                    <Link
                      to={`/station/${s.fid}`}
                      component={NavLink}
                      color='secondary'
                      underline='none'
                    >
                      {s.nimi}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align='center'>{s.osoite}</StyledTableCell>
                  <StyledTableCell align='center'>{s.kaupunki}</StyledTableCell>
                  {!matches && <StyledTableCell align='center'>{s.kapasiteet}</StyledTableCell>}
                </StyledTableRow>
              ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                colSpan={5}
                count={totalStations}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default AllStations
