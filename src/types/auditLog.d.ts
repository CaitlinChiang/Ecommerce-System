import { ObjectId } from 'mongodb'

export interface AuditLog {
  _id?: ObjectId
  action?: string
  orderId?: ObjectId
  paymentId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
  userId?: ObjectId
  createdBy?: ObjectId
  createdAt?: Date
}

export interface CreateAuditLogArgs {
  _id: ObjectId
  action: string
  orderId?: ObjectId
  paymentId?: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
  userId?: ObjectId
  createdBy: ObjectId
  createdAt: Date
}
