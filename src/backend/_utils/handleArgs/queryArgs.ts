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

  const queryArgs: any = correctArgs({ ...commonArgs })

  queryArgs.deletedAt = { $exists: false }

  if (categoryIds?.length > 0) {
    const categoryIdArr = categoryIds.map((id: string): ObjectId => new ObjectId(id))
    queryArgs.categoryId = { $in: categoryIdArr }
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
    const statusArr = statuses.map((status: OrderStatus): OrderStatus => status)
    queryArgs.status = { $in: statusArr }
  }

  if (stockQuantity) {
    stockQuantityArgs(queryArgs, stockQuantity)
  }

  return queryArgs
}
