import { SortDirection } from '../types/_enums/sortDirection'

export interface PaginateTableArgs {
  page?: number
  rowsPerPage?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
