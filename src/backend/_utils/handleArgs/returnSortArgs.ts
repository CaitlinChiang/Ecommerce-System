import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { SortDirection } from '../../_enums/sortDirection'

export const sortArgs = (args: PaginateDataArgs): any => {
  const { sortBy, sortDirection } = args

  if (!sortBy || !sortDirection) return

  return { [sortBy]: sortDirection === SortDirection.ASC ? 1 : -1 }
}
