import { SortDirection } from '../../backend/_enums/sortDirection'

export interface PaginateDataArgs {
  page?: number
  rowsPerPage?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
