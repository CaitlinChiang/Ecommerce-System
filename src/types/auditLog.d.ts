import { ObjectId } from 'mongodb'
import { DateRange } from './common/dateRange'

export interface AuditLog {
  _id?: ObjectId
  action?: string
  cityId?: ObjectId
  faqId?: ObjectId
  orderId?: ObjectId
  paymentId?: ObjectId
  paymentMethodId?: ObjectId
  productCategoryId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
  reviewId?: ObjectId
  userId?: ObjectId
  websiteTextId?: ObjectId
  createdAt?: Date
  createdBy?: ObjectId
}

export interface GetAuditLogArgs {
  action?: string
  orderId?: ObjectId
  paymentId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
  dateRange?: DateRange
}
