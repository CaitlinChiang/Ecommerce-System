import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { SortDirection } from '../../_enums/sortDirection'

export const sort = (args: PaginateDataArgs): any => {
  const { sortBy, sortDirection } = args

  if (!sortBy || !sortDirection) return

  return { [sortBy]: sortDirection === SortDirection.ASC ? 1 : -1 }
}

export const skip = (args: PaginateDataArgs): number => {
  const { page, rowsPerPage } = args

  if (!page || !rowsPerPage) return 0

  return page * rowsPerPage
}

export const limit = (args: PaginateDataArgs): number => {
  const { rowsPerPage } = args

  if (!rowsPerPage) return 0

  return rowsPerPage
}
