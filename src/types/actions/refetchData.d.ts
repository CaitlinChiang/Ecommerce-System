import { PaginateDataArgs } from './paginateData'

export interface RefetchDataArgs {
  args: any
  count: number
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  refetch: any
}
