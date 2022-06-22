import { SortDirection } from '../types/_enums/sortDirection'

export interface PaginateDataArgs {
  page?: number
  rowsPerPage?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
