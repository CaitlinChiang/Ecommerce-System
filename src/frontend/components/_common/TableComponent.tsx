import React, { ReactElement } from 'react'
import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { SearchTableQueryArgs } from '../../../types/actions/searchTableQuery'
import { SortDirection } from '../../../types/_enums/sortDirection'
import { formatTableHeader } from '../_helpers/formatTableHeaders'

const TableComponent = ({
  count,
  headers,
  headersAlign,
  loading,
  page,
  rows,
  rowsPerPage,
  rowsPerPageOptions,
  searchTableQuery,
  setPage,
  setRowsPerPage,
  setSearchTableQuery
}: {
  count: number
  headers: string[]
  headersAlign: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  loading: boolean
  page: number
  rows: any[]
  rowsPerPage: number
  rowsPerPageOptions: number[]
  searchTableQuery: SearchTableQueryArgs
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setSearchTableQuery: React.Dispatch<React.SetStateAction<SearchTableQueryArgs>>
}): ReactElement => {
  return (
    <>
      {loading && <LinearProgress />}
      <TableContainer>
        <TablePagination
          component={'span'}
          count={count}
          onRowsPerPageChange={async (e): Promise<void> => {
            const newRowsPerPage = Number(e.target.value)
            setRowsPerPage(newRowsPerPage)
            setPage(0)
          }}
          onPageChange={async (_e, newPage: number): Promise<void> => {
            window.scrollTo(0, 0)
            setPage(newPage)
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              {headers.map((header: string, index: number): ReactElement => {
                return (
                  <TableCell key={index} align={headersAlign} padding={'checkbox'}>
                    <TableSortLabel
                      active={searchTableQuery.sortBy === header}
                      direction={
                        searchTableQuery.sortDirection || SortDirection.DESC
                      }
                      onClick={(): void => {
                        setSearchTableQuery({
                          sortBy: header,
                          sortDirection:
                            searchTableQuery.sortDirection === SortDirection.ASC
                              ? SortDirection.DESC
                              : SortDirection.ASC
                        })
                      }}
                    >
                      {formatTableHeader(header)}
                      {searchTableQuery.sortBy === header ? (
                        <Box component='span' sx={{ display: 'hidden' }}>
                          {searchTableQuery.sortBy === SortDirection.DESC
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>{rows.map((row: any): ReactElement => row)}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableComponent
