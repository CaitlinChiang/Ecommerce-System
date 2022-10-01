import { ReactElement, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import SearchField from './SearchField'
import PaginationComponent from './PaginationComponent'
import { searchData } from '../../_utils/handleData/searchData'

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
  const { searchText, sortBy } = paginateDataArgs

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
      {loading && <CircularProgress />}
      <PaginationComponent
        count={count}
        paginateDataArgs={paginateDataArgs}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default CardsPaginationComponent
