import { ObjectId } from 'mongodb'
import { StockQuantityOperator } from '../../_enums/stockQuantityOperator'

export const queryArgs = (args: any): any => {
  const { categoryIds, dateRange, paginateData, stockQuantity, ...specificArgs } =
    args

  if (paginateData?.searchText) {
    return { $text: { $search: paginateData.searchText } }
  }

  const modifiedArgs: any = { ...specificArgs }

  Object.keys(modifiedArgs).forEach((key) => {
    if (modifiedArgs[key] != null && String(key).includes('Id')) {
      modifiedArgs[key] = new ObjectId(modifiedArgs[key])
    }

    if (modifiedArgs[key] === null) {
      delete modifiedArgs[key]
    }
  })

  modifiedArgs.deletedAt = { $exists: false }

  if (categoryIds?.length > 0) {
    modifiedArgs.categoryId = {
      $in: categoryIds.map(
        (categoryId: string): ObjectId => new ObjectId(categoryId)
      )
    }
  }

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
