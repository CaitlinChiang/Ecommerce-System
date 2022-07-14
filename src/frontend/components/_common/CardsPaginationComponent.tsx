import { ReactElement, useEffect } from 'react'
import { LinearProgress, TablePagination } from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import SearchField from './SearchField'
import { searchData } from '../../_utils/handleData/searchData'
import { generateRowsPerPage } from '../../_utils/handleData/generateRowsPerPage'

const CardsPaginationComponent = ({
  args,
  count,
  fetchMore,
  loading,
  paginateDataArgs,
  searchLabel,
  searchPlaceholder,
  setPaginateDataArgs
}: {
  args?: any
  count: number
  fetchMore?: any
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  searchLabel?: string
  searchPlaceholder?: string
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const { page, rowsPerPage, searchText, sortBy } = paginateDataArgs

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
    </>
  )
}

export default CardsPaginationComponent
