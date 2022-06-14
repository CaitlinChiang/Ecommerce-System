export const queryArgs = (args: any): any => {
  const { dateRange, paginateData, ...specificArgs } = args

  const modifiedArgs: any = {
    specificArgs
  }

  if (paginateData?.searchText) {
    modifiedArgs['$text'] = { $search: paginateData.searchText }
  }

  if (dateRange?.startDate && dateRange?.endDate) {
    modifiedArgs.createdAt = {
      $gte: new Date(args.startDate),
      $lte: new Date(args.endDate)
    }
  }

  return modifiedArgs
}
