import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DateRange } from './common/dateRange'
import { WebsiteTextType } from '../backend/_enums/websiteTextType'

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
  websiteTextType?: WebsiteTextType
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
}

export interface GetAuditLogArgs {
  dateRange?: DateRange
  orderId?: ObjectId
  paginateData?: PaginateDataArgs
}
