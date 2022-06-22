import { RefetchDataArgs } from '../../types/actions/refetchData'

export const refetchData = (refetchDataArgs: RefetchDataArgs): void => {
  const { args, refetch, loading, paginateDataArgs } = refetchDataArgs

  if (loading) return

  refetch({
    ...args,
    paginateData: paginateDataArgs
  })
}
