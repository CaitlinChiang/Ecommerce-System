import { ObjectId } from 'mongodb'
import { OrderStatus } from '../../_enums/orderStatus'
import { correctArgs } from './correctArgs'
import { formatDateRange } from '../handleFormat/formatDateRange'
import { stockQuantityArgs } from './stockQuantityArgs'

export const queryArgs = (args: any): any => {
  const {
    categoryIds,
    cityId,
    dateRange,
    discount,
    paginateData,
    statuses,
    stockQuantity,
    ...queryArgs
  } = args

  if (paginateData?.searchText) {
    const modifiedSearchText = paginateData?.searchText.split('@')[0]

    return { $text: { $search: modifiedSearchText } }
  }

  const modifiedArgs: any = { ...queryArgs }
  correctArgs({ args: modifiedArgs })

  modifiedArgs.deletedAt = { $exists: false }

  if (categoryIds?.length > 0) {
    modifiedArgs.categoryId = {
      $in: categoryIds.map(
        (categoryId: string): ObjectId => new ObjectId(categoryId)
      )
    }
  }

  if (cityId) {
    modifiedArgs['deliveryAddress.cityId'] = new ObjectId(cityId)
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

  if (statuses?.length > 0) {
    modifiedArgs.status = {
      $in: statuses.map((status: OrderStatus): OrderStatus => status)
    }
  }

  if (stockQuantity) {
    stockQuantityArgs(modifiedArgs, stockQuantity)
  }

  return modifiedArgs
}
