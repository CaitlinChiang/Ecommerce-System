export const queryArgs = (args: any): any => {
  const { dateRange, paginateData, ...specificArgs } = args

  if (paginateData?.searchText) {
    return { $text: { $search: paginateData.searchText } }
  }

  const modifiedArgs: any = { specificArgs }

  if (dateRange?.startDate && dateRange?.endDate) {
    modifiedArgs[dateRange.filterBy] = {
      $gte: new Date(dateRange.startDate),
      $lte: new Date(dateRange.endDate)
    }
  }

  return modifiedArgs
}
