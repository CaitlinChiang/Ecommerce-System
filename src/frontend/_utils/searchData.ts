import { PaginateDataArgs } from '../../types/actions/paginateData'

export const searchData = (
  fetchMore: any,
  loading: boolean,
  page: number,
  paginateDataArgs: PaginateDataArgs,
  specificArgs: any
): void => {
  if (loading) return

  fetchMore({
    variables: {
      paginateData: {
        ...paginateDataArgs,
        offset: Number(page * paginateDataArgs.rowsPerPage)
      },
      ...specificArgs
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) return prev
      return fetchMoreResult
    }
  })
}
