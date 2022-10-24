import React, { ReactElement, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
import { formatText } from '../../_utils/handleFormat/formatText'

const TableComponent = ({
  count,
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
  count: number
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
  const { sortBy, sortDirection } = paginateDataArgs

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    setPaginateDataArgs({ ...paginateDataArgs, page: 0 })
  }, [searchText, sortBy, sortDirection])

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
        <Box sx={{ overflow: { xs: 'auto', sm: 'unset' } }}>
          <Grid container sx={{ justifyContent: 'right' }}>
            {searchLabel && (
              <>
                <Grid item xs={5}>
                  <SearchField
                    onKeyDown={(e): void => {
                      if (e.key === 'Enter') {
                        setPaginateDataArgs({ ...paginateDataArgs, searchText })
                      }
                    }}
                    searchLabel={searchLabel}
                    searchPlaceholder={searchPlaceholder}
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </Grid>
                <Grid item xs={1.2}>
                  <Button
                    color={'primary'}
                    sx={{ borderRadius: 5, marginTop: 2 }}
                    onClick={(): void => {
                      setPaginateDataArgs({ ...paginateDataArgs, searchText })
                    }}
                    variant={'contained'}
                  >
                    {'Search'}
                  </Button>
                </Grid>
              </>
            )}
            {filterContent && (
              <Grid item xs={1}>
                <ToolbarComponent />
              </Grid>
            )}
          </Grid>
          {loading && <LinearProgress />}
          <PaginationComponent
            count={count}
            paginateDataArgs={paginateDataArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
          <TableContainer>
            <Table>
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
          </TableContainer>
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
