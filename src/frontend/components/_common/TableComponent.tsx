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
import { PaginateDataArgs } from '../../../types/actions/paginateData'
// import { SortDirection } from '../../../types/_frontendEnums/sortDirection'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'
import { searchData } from '../__helpers/searchData'
import { formatTableHeader } from '../__helpers/formatTableHeaders'

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

const TableComponent = ({
  count,
  fetchMore,
  filterContent,
  filterOpen,
  headers,
  headersAlign,
  loading,
  paginateDataArgs,
  rows,
  rowsPerPageOptions,
  searchLabel,
  searchPlaceholder,
  setFilterOpen,
  setPaginateDataArgs,
  specificArgs
}: {
  count: number
  fetchMore?: any
  filterContent?: ReactElement
  filterOpen?: boolean
  headers: string[]
  headersAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  rows: any[]
  rowsPerPageOptions: number[]
  searchLabel?: string
  searchPlaceholder?: string
  setFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
  specificArgs?: any
}): ReactElement => {
  const { page, rowsPerPage, searchText, sortBy, sortDirection } = paginateDataArgs

  useEffect(() => {
    setPaginateDataArgs({ page: 0 })
  }, [searchText, sortBy])

  useEffect(() => {
    searchData(fetchMore, loading, paginateDataArgs, specificArgs)
  }, [paginateDataArgs])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => searchData(fetchMore, loading, paginateDataArgs, specificArgs),
      500
    )
    return (): void => clearTimeout(timeoutId)
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
      <SearchField
        onKeyDown={(e): void => {
          if (e.key === 'Enter') {
            searchData(fetchMore, loading, paginateDataArgs, specificArgs)
          }
        }}
        onSearch={(): void => {
          searchData(fetchMore, loading, paginateDataArgs, specificArgs)
        }}
        searchButtonDisabled={loading}
        searchLabel={searchLabel}
        searchPlaceholder={searchPlaceholder}
        searchText={searchText}
        setPaginateDataArgs={setPaginateDataArgs}
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
              setPaginateDataArgs({
                rowsPerPage: newRowsPerPage,
                page: 0
              })
            }}
            onPageChange={async (_e, newPage: number): Promise<void> => {
              window.scrollTo(0, 0)
              setPaginateDataArgs({ page: newPage })
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
                  <TableCell
                    key={index}
                    align={headersAlign || 'center'}
                    padding={'checkbox'}
                  >
                    <TableSortLabel
                      active={sortBy === header}
                      direction={sortDirection || SortDirection.DESC}
                      onClick={(): void => {
                        setPaginateDataArgs({
                          sortBy: header,
                          sortDirection:
                            sortDirection === SortDirection.ASC
                              ? SortDirection.DESC
                              : SortDirection.ASC
                        })
                      }}
                    >
                      {formatTableHeader(header)}
                      {sortBy === header ? (
                        <Box component='span' sx={{ display: 'hidden' }}>
                          {sortBy === SortDirection.DESC
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
