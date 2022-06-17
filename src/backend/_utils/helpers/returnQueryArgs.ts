import { StockQuantityOperator } from '../../_enums/stockQuantityOperator'

export const queryArgs = (args: any): any => {
  const { dateRange, paginateData, stockQuantity, ...specificArgs } = args

  if (paginateData?.searchText) {
    return { $text: { $search: paginateData.searchText } }
  }

  const modifiedArgs: any = { ...specificArgs }

  if (dateRange?.startDate && dateRange?.endDate) {
    modifiedArgs[dateRange.filterBy] = {
      $gte: new Date(dateRange.startDate),
      $lte: new Date(dateRange.endDate)
    }
  }

  if (stockQuantity) {
    switch (stockQuantity.operator) {
      case StockQuantityOperator.ABOVE:
        modifiedArgs.stockQuantity = { $gt: stockQuantity.value1 }
        break
      case StockQuantityOperator.BELOW:
        modifiedArgs.stockQuantity = { $lt: stockQuantity.value1 }
        break
      case StockQuantityOperator.BETWEEN:
        modifiedArgs.stockQuantity = {
          $gt: stockQuantity.value1,
          $lt: stockQuantity.value2
        }
        break
      case StockQuantityOperator.EQUAL:
        modifiedArgs.stockQuantity = stockQuantity.value1
        break
    }
  }

  return modifiedArgs
}
