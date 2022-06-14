import React, { ReactElement, useEffect } from 'react'
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
import { PaginateTableArgs } from '../../../types/actions/paginateTable'
import { SortDirection } from '../../../types/_enums/sortDirection'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'
import { searchData } from '../__helpers/searchData'
import { formatTableHeader } from '../__helpers/formatTableHeaders'

const TableComponent = ({
  count,
  fetchMore,
  filterContent,
  filterOpen,
  headers,
  headersAlign,
  loading,
  page,
  paginateTableArgs,
  rows,
  rowsPerPage,
  rowsPerPageOptions,
  searchLabel,
  searchPlaceholder,
  setFilterOpen,
  setPage,
  setRowsPerPage,
  setPaginateTableArgs
}: {
  count: number
  fetchMore?: any
  filterContent?: ReactJSXElement
  filterOpen?: boolean
  headers: string[]
  headersAlign: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  loading: boolean
  page: number
  paginateTableArgs: PaginateTableArgs
  rows: any[]
  rowsPerPage: number
  rowsPerPageOptions: number[]
  searchLabel?: string
  searchPlaceholder?: string
  setFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setPaginateTableArgs: React.Dispatch<React.SetStateAction<PaginateTableArgs>>
}): ReactElement => {
  const { searchText, sortBy, sortDirection } = paginateTableArgs

  useEffect(() => {
    setPage(0)
  }, [paginateTableArgs.searchText, paginateTableArgs.sortBy])

  useEffect(() => {
    searchData(loading, fetchMore, paginateTableArgs)
  }, [sortBy, sortDirection, page, rowsPerPage, searchText])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => searchData(loading, fetchMore, paginateTableArgs),
      500
    )
    return (): void => {
      clearTimeout(timeoutId)
    }
  }, [searchText])

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
            searchData(fetchMore, loading, paginateTableArgs)
          }
        }}
        onSearch={(): void => {
          searchData(fetchMore, loading, paginateTableArgs)
        }}
        searchButtonDisabled={loading}
        searchLabel={searchLabel}
        searchPlaceholder={searchPlaceholder}
        searchText={paginateTableArgs.searchText}
        setPaginateTableArgs={setPaginateTableArgs}
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
                      active={paginateTableArgs.sortBy === header}
                      direction={
                        paginateTableArgs.sortDirection || SortDirection.DESC
                      }
                      onClick={(): void => {
                        setPaginateTableArgs({
                          sortBy: header,
                          sortDirection:
                            paginateTableArgs.sortDirection === SortDirection.ASC
                              ? SortDirection.DESC
                              : SortDirection.ASC
                        })
                      }}
                    >
                      {formatTableHeader(header)}
                      {paginateTableArgs.sortBy === header ? (
                        <Box component='span' sx={{ display: 'hidden' }}>
                          {paginateTableArgs.sortBy === SortDirection.DESC
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
