import { PaginateDataArgs } from '../../../types/actions/paginateData'

export const searchData = (
  args: any,
  fetchMore: any,
  loading: boolean,
  paginateDataArgs: PaginateDataArgs
): void => {
  if (loading) return

  fetchMore({
    variables: {
      ...args,
      paginateData: paginateDataArgs
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) return prev
      return fetchMoreResult
    }
  })
}
