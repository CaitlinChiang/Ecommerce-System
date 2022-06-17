import React, { ReactElement, useEffect } from 'react'
import theme from '../../themes'
import {
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
  ASC = 'asc',
  DESC = 'desc'
}

const TableComponent = ({
  count,
  fetchMore,
  filterContent,
  filterOpen,
  headers,
  headersAlign,
  loading,
  page,
  paginateDataArgs,
  rows,
  rowsPerPageOptions,
  searchLabel,
  searchPlaceholder,
  setFilterOpen,
  setPage,
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
  page: number
  paginateDataArgs: PaginateDataArgs
  rows: any[]
  rowsPerPageOptions: number[]
  searchLabel?: string
  searchPlaceholder?: string
  setFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
  specificArgs?: any
}): ReactElement => {
  const { rowsPerPage, searchText, sortBy, sortDirection } = paginateDataArgs

  console.log(paginateDataArgs)

  useEffect(() => {
    setPage(0)
  }, [searchText, sortBy])

  useEffect(() => {
    searchData(fetchMore, loading, page, paginateDataArgs, specificArgs)
  }, [page, paginateDataArgs])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => searchData(fetchMore, loading, page, paginateDataArgs, specificArgs),
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
            searchData(fetchMore, loading, page, paginateDataArgs, specificArgs)
          }
        }}
        onSearch={(): void => {
          searchData(fetchMore, loading, page, paginateDataArgs, specificArgs)
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
              setPage(0)
              setPaginateDataArgs({
                ...paginateDataArgs,
                rowsPerPage: newRowsPerPage
              })
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
                          ...paginateDataArgs,
                          sortBy: header,
                          sortDirection:
                            sortDirection === SortDirection.ASC
                              ? SortDirection.DESC
                              : SortDirection.ASC
                        })
                      }}
                    >
                      {formatTableHeader(header)}
                    </TableSortLabel>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableComponent
