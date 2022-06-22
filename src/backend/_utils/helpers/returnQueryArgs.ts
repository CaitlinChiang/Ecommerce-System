import { ObjectId } from 'mongodb'
import { StockQuantityOperator } from '../../_enums/stockQuantityOperator'
import { correctArgs } from './correctArgs'
import { formatDateRange } from './dateFormatters/formatDateRange'

export const queryArgs = (args: any): any => {
  const { categoryIds, dateRange, paginateData, stockQuantity, ...queryArgs } = args

  if (paginateData?.searchText) {
    return { $text: { $search: paginateData.searchText } }
  }

  const modifiedArgs: any = { ...queryArgs }

  correctArgs(modifiedArgs, false)

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
      $gte: formatDateRange(dateRange?.startDate, true),
      $lte: formatDateRange(dateRange?.endDate, false)
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
