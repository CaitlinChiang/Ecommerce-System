import { PaginateTableArgs } from '../../../types/actions/paginateTable'

export const searchData = (
  fetchMore: any,
  loading: boolean,
  paginateTableArgs: PaginateTableArgs
): void => {
  if (loading) {
    return
  }

  fetchMore({
    variables: {
      ...paginateTableArgs,
      offset: Number(paginateTableArgs.page * paginateTableArgs.rowsPerPage)
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) {
        return prev
      }

      return fetchMoreResult
    }
  })
}
