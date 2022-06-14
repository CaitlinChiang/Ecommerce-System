export const modifiedArgs = (args: any): any => {
  const {
    dateRange: { startDate, endDate },
    ...specificArgs
  } = args

  const searchQuery: any = {
    specificArgs
  }

  if (startDate && endDate) {
    searchQuery.createdAt = {
      $gte: new Date(args.startDate),
      $lte: new Date(args.endDate)
    }
  }

  return searchQuery
}
