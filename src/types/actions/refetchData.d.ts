import { PaginateDataArgs } from './paginateData'

export interface RefetchDataArgs {
  args: any
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  refetch: any
}
