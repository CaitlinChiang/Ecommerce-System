export const queryArgs = (args: any): any => {
  const { dateRange, ...specificArgs } = args

  const modifiedArgs: any = {
    specificArgs
  }

  if (dateRange?.startDate && dateRange?.endDate) {
    modifiedArgs.createdAt = {
      $gte: new Date(args.startDate),
      $lte: new Date(args.endDate)
    }
  }

  return modifiedArgs
}
