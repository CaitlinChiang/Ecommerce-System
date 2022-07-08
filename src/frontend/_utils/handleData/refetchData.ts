import { RefetchDataArgs } from '../../../types/actions/refetchData'

export const refetchData = (refetchDataArgs: RefetchDataArgs): void => {
  const { args, loading, refetch, paginateDataArgs } = refetchDataArgs

  if (loading) console.log('Loading...')

  refetch({
    ...args,
    paginateData: paginateDataArgs
  })
}
