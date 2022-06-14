import { PaginateDataArgs } from '../../../types/actions/paginateData'

export const searchData = (
  fetchMore: any,
  loading: boolean,
  paginateDataArgs: PaginateDataArgs
): void => {
  if (loading) return

  fetchMore({
    variables: {
      ...paginateDataArgs,
      offset: Number(paginateDataArgs.page * paginateDataArgs.rowsPerPage)
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) return prev
      return fetchMoreResult
    }
  })
}
