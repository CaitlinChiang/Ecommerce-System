import { PaginateDataArgs } from './paginateData'

export interface RefetchDataArgs {
  args: any
  loading: boolean
  page: number
  paginateDataArgs: PaginateDataArgs
  refetch: any
}
