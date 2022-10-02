import React, { ReactElement, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { SortDirection } from '../../_enums/sortDirection'
import ModalComponent from './ModalComponent'
import SearchField from './SearchField'
import PaginationComponent from './PaginationComponent'
import { searchData } from '../../_utils/handleData/searchData'
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
  const { searchText, sortBy, sortDirection } = paginateDataArgs

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

  const ToolbarComponent = (): ReactElement => {
    return (
      <Toolbar>
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
        {loading && <LinearProgress />}
        <Box sx={{ overflow: { xs: 'auto', sm: 'unset' } }}>
          <Grid container sx={{ justifyContent: 'right' }}>
            <Grid item xs={3}>
              {!searchLabel && (
                <SearchField
                  onKeyDown={(e): void => {
                    if (e.key === 'Enter') {
                      searchData(args, fetchMore, loading, paginateDataArgs)
                    }
                  }}
                  searchLabel={searchLabel}
                  searchPlaceholder={searchPlaceholder}
                  searchText={searchText}
                  setPaginateDataArgs={setPaginateDataArgs}
                />
              )}
            </Grid>
            <Grid item xs={1}>
              {filterContent && <ToolbarComponent />}
            </Grid>
          </Grid>
          <PaginationComponent
            count={count}
            paginateDataArgs={paginateDataArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
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
          <PaginationComponent
            count={count}
            paginateDataArgs={paginateDataArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default TableComponent
