import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { SortDirection } from '../../../types/_enumsBackend/sortDirection'

export const sortArgs = (paginateData: PaginateDataArgs) => {
  const { sortBy, sortDirection } = paginateData

  const modifiedArgs: any = {}

  if (sortBy && sortDirection) {
    modifiedArgs[sortBy] = sortDirection == SortDirection.ASC ? 1 : -1
  }

  return modifiedArgs
}
