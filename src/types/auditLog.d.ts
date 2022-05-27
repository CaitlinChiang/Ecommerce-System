import { ObjectId } from 'mongodb'

export interface AuditLog {
  _id?: ObjectId
  action?: string
  cityId?: ObjectId
  faqId?: ObjectId
  orderId?: ObjectId
  paymentId?: ObjectId
  productId?: ObjectId
  productCategoryId?: ObjectId
  productVariantId?: ObjectId
  reviewId?: ObjectId
  userId?: ObjectId
  createdAt?: Date
  createdBy?: ObjectId
}

export interface GetAuditLogArgs {
  action?: string
  orderId?: ObjectId
  paymentId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
}
