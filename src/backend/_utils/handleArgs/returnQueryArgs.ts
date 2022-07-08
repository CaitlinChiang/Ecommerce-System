import { ObjectId } from 'mongodb'
import { correctArgs } from './correctArgs'
import { formatDateRange } from '../handleDates/formatDateRange'
import { formatStockQuantityArgs } from './formatStockQuantityArgs'

export const queryArgs = (args: any): any => {
  const {
    categoryIds,
    dateRange,
    discount,
    paginateData,
    stockQuantity,
    ...queryArgs
  } = args

  if (paginateData?.searchText) {
    const modifiedSearchText = paginateData?.searchText.split('@')[0]

    return { $text: { $search: modifiedSearchText } }
  }

  const modifiedArgs: any = { ...queryArgs }
  correctArgs({ modifiedArgs })

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

  if (discount) {
    modifiedArgs.discount = { $exists: true }
  }

  if (stockQuantity) {
    formatStockQuantityArgs(modifiedArgs, stockQuantity)
  }

  return modifiedArgs
}
