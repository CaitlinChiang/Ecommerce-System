import React, { ReactElement } from 'react'
import theme from '../../themes'
import {
  Box,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { SearchTableQueryArgs } from '../../../types/actions/searchTableQuery'
import { SortDirection } from '../../../types/_enums/sortDirection'
import { searchData } from '../__helpers/searchData'
import { formatTableHeader } from '../__helpers/formatTableHeaders'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'

const TableComponent = ({
  count,
  filterContent,
  filterOpen,
  headers,
  headersAlign,
  loading,
  page,
  rows,
  rowsPerPage,
  rowsPerPageOptions,
  searchLabel,
  searchPlaceholder,
  searchTableQuery,
  setFilterOpen,
  setPage,
  setRowsPerPage,
  setSearchTableQuery
}: {
  count: number
  filterContent?: ReactJSXElement
  filterOpen?: boolean
  headers: string[]
  headersAlign: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  loading: boolean
  page: number
  rows: any[]
  rowsPerPage: number
  rowsPerPageOptions: number[]
  searchLabel?: string
  searchPlaceholder?: string
  searchTableQuery: SearchTableQueryArgs
  setFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setSearchTableQuery: React.Dispatch<React.SetStateAction<SearchTableQueryArgs>>
}): ReactElement => {
  return (
    <>
      <ModalComponent
        content={filterContent}
        onClose={(): void => {
          setFilterOpen(false)
        }}
        open={filterOpen}
      />
      {searchPlaceholder}
      <SearchField
        onKeyDown={(e): void => {
          if (e.key === 'Enter') {
            searchData()
          }
        }}
        onSearch={(): void => {
          searchData()
        }}
        searchButtonDisabled={loading}
        searchLabel={searchLabel}
        searchPlaceholder={searchPlaceholder}
        searchText={searchTableQuery.searchText}
        setSearchTableQuery={setSearchTableQuery}
      />
      {loading && <LinearProgress />}
      <TableContainer>
        <div
          style={{
            [theme.breakpoints.up('sm')]: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          }}
        >
          {filterContent && (
            <Tooltip title={'Filter'}>
              <IconButton
                color={'primary'}
                onClick={(): void => {
                  setFilterOpen(true)
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
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
        </div>
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
