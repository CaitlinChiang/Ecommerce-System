import { PaginateDataArgs } from '../../types/actions/paginateData'

export const refetchData = (
  args: any,
  refetch: any,
  loading: boolean,
  page: number,
  paginateDataArgs: PaginateDataArgs
): void => {
  if (loading) return

  refetch({
    ...args,
    paginateData: {
      ...paginateDataArgs,
      offset: Number(page * paginateDataArgs.rowsPerPage)
    }
  })
}
