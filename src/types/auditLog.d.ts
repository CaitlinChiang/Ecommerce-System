import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DateRange } from './common/dateRange'

export interface AuditLog {
  _id?: ObjectId
  action?: string
  cityId?: ObjectId
  faqId?: ObjectId
  orderId?: ObjectId
  paymentMethodId?: ObjectId
  productCategoryId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
  reviewId?: ObjectId
  userId?: ObjectId
  websiteTextId?: ObjectId
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
}

export interface GetAuditLogArgs {
  orderId?: ObjectId
  paginateData?: PaginateDataArgs
  dateRange?: DateRange
}
