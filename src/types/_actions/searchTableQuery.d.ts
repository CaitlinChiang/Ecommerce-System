import { SortDirection } from '../types/_enums/sortDirection'

export interface SearchTableQueryArgs {
  page?: number
  rowsPerPage?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
