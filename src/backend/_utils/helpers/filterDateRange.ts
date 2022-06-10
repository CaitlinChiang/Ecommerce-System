export const modifiedArgsWithDateFilter = (args: any): any => {
  const { startDate, endDate, ...remainingArgs } = args

  const searchQuery: any = {
    remainingArgs
  }

  if (startDate && endDate) {
    searchQuery.createdAt = {
      $gte: new Date(args.startDate),
      $lte: new Date(args.endDate)
    }
  }

  return searchQuery
}
