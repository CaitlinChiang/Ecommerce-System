import React, { ReactElement } from 'react'
import {
  Box,
  LinearProgress,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { SortDirection } from '../../../types/_enums/sortDirection'
import { SearchTableQueryArgs } from '../../../types/_actions/searchTableQuery'
import { formatTableHeader } from '../_helpers/formatTableHeaders'

const TableComponent = ({
  count,
  loading,
  headersAlign,
  headers,
  rows,
  rowsPerPageOptions,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchTableQuery,
  setSearchTableQuery
}: {
  count: number
  loading?: boolean
  headersAlign: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  headers: string[]
  rows: any[]
  rowsPerPageOptions: number[]
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  searchTableQuery: SearchTableQueryArgs
  setSearchTableQuery: React.Dispatch<React.SetStateAction<SearchTableQueryArgs>>
}): ReactElement => {
  return (
    <>
      {loading && <LinearProgress />}
      <TableContainer>
        <TablePagination
          component={'span'}
          count={count}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={async (e): Promise<void> => {
            const newRowsPerPage = Number(e.target.value)
            setRowsPerPage(newRowsPerPage)
            setPage(0)
          }}
          page={page}
          onPageChange={async (_e, newPage: number): Promise<void> => {
            window.scrollTo(0, 0)
            setPage(newPage)
          }}
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
