import React, { ReactElement, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { SortDirection } from '../../_enums/sortDirection'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'
import { searchData } from '../../_utils/handleData/searchData'
import { generateRowsPerPage } from '../../_utils/handleData/generateRowsPerPage'
import { formatText } from '../../_utils/handleFormat/formatText'

const TableComponent = ({
  args,
  count,
  fetchMore,
  filterContent,
  filterOpen,
  headers,
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
  headers: { label: string; sortable: boolean }[]
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

  const TablePaginationActions = (props: any): ReactElement => {
    const { count, onPageChange, page, rowsPerPage } = props

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton disabled={page === 0} onClick={(e: any) => onPageChange(e, 0)}>
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={page === 0}
          onClick={(e: any) => onPageChange(e, page - 1)}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={(e: any) => onPageChange(e, page + 1)}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={(e: any) =>
            onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
          }
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    )
  }

  const TablePaginationComponent = (): ReactElement => {
    return (
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
        rowsPerPage={rowsPerPage || count}
        rowsPerPageOptions={generateRowsPerPage(count)}
        ActionsComponent={TablePaginationActions}
        SelectProps={{ native: true }}
      />
    )
  }

  const ToolbarComponent = (): ReactElement => {
    return (
      <Toolbar sx={{ justifyContent: 'right', left: 30 }}>
        <Tooltip title={'Filter'}>
          <IconButton onClick={(): void => setFilterOpen(true)}>
            <FilterListIcon color='primary' />
          </IconButton>
        </Tooltip>
      </Toolbar>
    )
  }

  return (
    <Card>
      <CardContent>
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
        <Box sx={{ overflow: { xs: 'auto', sm: 'unset' } }}>
          {filterContent && <ToolbarComponent />}
          <TablePaginationComponent />
          <Table sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                {headers.map(
                  (
                    header: { label: string; sortable: boolean },
                    index: number
                  ): ReactElement => {
                    return (
                      <TableCell key={index}>
                        {!header.sortable && (
                          <Typography variant={'h5'}>
                            {formatText(header.label)}
                          </Typography>
                        )}
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
                            <Typography variant={'h5'}>
                              {formatText(header.label)}
                            </Typography>
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
          <TablePaginationComponent />
        </Box>
      </CardContent>
    </Card>
  )
}

export default TableComponent
