import { SortDirection } from '../../../types/_enums/sortDirection'

export const sortArgs = (sortBy: string, sortDirection: SortDirection) => {
  let numericSortDirection = 0

  switch (sortDirection) {
    case SortDirection.ASC:
      numericSortDirection = 1
      break
    case SortDirection.DESC:
      numericSortDirection = -1
      break
  }

  return { [sortBy]: numericSortDirection }
}
