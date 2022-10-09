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
    ...commonArgs
  } = args

  if (paginateData?.searchText) {
    const modifiedSearchText = paginateData?.searchText.split('@')[0]
    return { $text: { $search: modifiedSearchText } }
  }

  const queryArgs: any = { ...commonArgs }
  correctArgs(queryArgs)

  queryArgs.deletedAt = { $exists: false }

  if (categoryIds?.length > 0) {
    queryArgs.categoryId = {
      $in: categoryIds.map((id: string): ObjectId => new ObjectId(id))
    }
  }

  if (cityId) {
    queryArgs['deliveryAddress.cityId'] = new ObjectId(cityId)
  }

  if (dateRange?.startDate && dateRange?.endDate) {
    queryArgs[dateRange.filterBy] = {
      $gte: formatDateRange(dateRange?.startDate, true),
      $lte: formatDateRange(dateRange?.endDate, false)
    }
  }

  if (discount) {
    queryArgs.discount = { $exists: true }
  }

  if (statuses?.length > 0) {
    queryArgs.status = {
      $in: statuses.map((status: OrderStatus): OrderStatus => status)
    }
  }

  if (stockQuantity) {
    stockQuantityArgs(queryArgs, stockQuantity)
  }

  return queryArgs
}
