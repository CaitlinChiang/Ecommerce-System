import { RefetchDataArgs } from '../../types/actions/refetchData'

export const refetchData = (refetchDataArgs: RefetchDataArgs): void => {
  const { args, refetch, loading, page, paginateDataArgs } = refetchDataArgs

  if (loading) return

  refetch({
    ...args,
    paginateData: {
      ...paginateDataArgs,
      offset: Number(page * paginateDataArgs.rowsPerPage)
    }
  })
}
