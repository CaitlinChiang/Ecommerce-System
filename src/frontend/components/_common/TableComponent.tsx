import React, { ReactElement, useEffect } from 'react'
import {
  Container,
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
import { SortDirection } from '../../_enums/sortDirection'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'
import { searchData } from '../../_utils/handleData/searchData'
import { generateRowsPerPage } from '../../_utils/handleData/generateRowsPerPage'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'

const TableComponent = ({
  args,
  count,
  fetchMore,
  filterContent,
  filterOpen,
  headers,
  headersAlign,
  loading,
  paginateDataArgs,
  rows,
  searchLabel,
  searchPlaceholder,
  setFilterOpen,
  setPaginateDataArgs
}: {
  args?: any
  count: number
  fetchMore?: any
  filterContent?: ReactElement
  filterOpen?: boolean
  headers: { display?: string; label: string; sortable: boolean }[]
  headersAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  rows: any[]
  searchLabel?: string
  searchPlaceholder?: string
  setFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const { page, rowsPerPage, searchText, sortBy, sortDirection } = paginateDataArgs

  useEffect(() => {
    setPaginateDataArgs({ ...paginateDataArgs, page: 0 })
  }, [searchText, sortBy])

  useEffect(() => {
    searchData(args, fetchMore, loading, paginateDataArgs)
  }, [paginateDataArgs])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => searchData(args, fetchMore, loading, paginateDataArgs),
      500
    )
    return (): void => clearTimeout(timeoutId)
  }, [searchText])

  return (
    <>
      <ModalComponent
        content={filterContent}
        onClose={(): void => setFilterOpen(false)}
        open={filterOpen}
        title={'Filters'}
      />
      {searchLabel && (
        <SearchField
          onKeyDown={(e): void => {
            if (e.key === 'Enter') {
              searchData(args, fetchMore, loading, paginateDataArgs)
            }
          }}
          onSearch={(): void => {
            searchData(args, fetchMore, loading, paginateDataArgs)
          }}
          searchButtonDisabled={loading}
          searchLabel={searchLabel}
          searchPlaceholder={searchPlaceholder}
          searchText={searchText}
          setPaginateDataArgs={setPaginateDataArgs}
        />
      )}
      {loading && <LinearProgress />}
      <TableContainer>
        <Container>
          {filterContent && (
            <Tooltip title={'Filter'}>
              <IconButton
                color={'primary'}
                onClick={(): void => setFilterOpen(true)}
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
                ...paginateDataArgs,
                page: 0,
                rowsPerPage: newRowsPerPage
              })
            }}
            onPageChange={async (_e, newPage: number): Promise<void> => {
              window.scrollTo(0, 0)
              setPaginateDataArgs({
                ...paginateDataArgs,
                page: newPage
              })
            }}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={generateRowsPerPage(count)}
          />
        </Container>
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              {headers.map(
                (
                  header: { display?: string; label: string; sortable: boolean },
                  index: number
                ): ReactElement => {
                  return (
                    <TableCell
                      key={index}
                      align={headersAlign || 'center'}
                      padding={'checkbox'}
                    >
                      {!header.sortable &&
                        formatProperCapitalization(header?.display || header.label)}
                      {header.sortable && (
                        <TableSortLabel
                          active={sortBy === header.label}
                          direction={sortDirection || SortDirection.DESC}
                          onClick={(): void => {
                            setPaginateDataArgs({
                              ...paginateDataArgs,
                              sortBy: header.label,
                              sortDirection:
                                sortDirection === SortDirection.ASC
                                  ? SortDirection.DESC
                                  : SortDirection.ASC
                            })
                          }}
                        >
                          {formatProperCapitalization(
                            header?.display || header.label
                          )}
                        </TableSortLabel>
                      )}
                    </TableCell>
                  )
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableComponent
