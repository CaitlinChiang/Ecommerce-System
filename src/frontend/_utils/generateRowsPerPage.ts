export const generateRowsPerPage = (count: number): number[] => {
  let rowsPerPageOptions: number[] = []

  if (count < 5) {
    rowsPerPageOptions = [5]
  }

  if (count > 5 && count <= 20) {
    rowsPerPageOptions = [5, 10]
  }

  if (count > 20 && count <= 50) {
    rowsPerPageOptions = [10, 15, 25]
  }

  if (count > 50 && count <= 75) {
    rowsPerPageOptions = [10, 15, 25, 50, 75]
  }

  if (count > 75) {
    rowsPerPageOptions = [10, 25, 50, 75, 100]
  }

  return rowsPerPageOptions
}
