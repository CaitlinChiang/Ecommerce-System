import { SortDirection } from '../types/_enums/sortDirection'

export interface PaginateDataArgs {
  offset?: number
  page?: number
  rowsPerPage?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
