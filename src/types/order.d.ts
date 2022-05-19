import { ObjectId } from 'mongodb'
import { AuditLog } from './auditLog'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Order {
  _id?: ObjectId
  auditLogs?: AuditLog[]
  collectionMethod?: string
  deliveryAddress?: string
  payment?: Payment
  paymentId?: ObjectId
  products?: Product[]
  productIds?: ObjectId[]
  productVariants?: ProductVariant[]
  productVariantIds?: ObjectId[]
  status?: string
  user?: User
  userId?: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface GetOrderArgs {
  _id: ObjectId
}

export interface CreateOrderArgs {
  collectionMethod?: string
  deliveryAddress?: string
  productIds?: ObjectId[]
  productVariantIds?: ObjectId[]
  status?: string
  userId?: ObjectId
  createdAt?: Date
}

export interface UpdateOrderArgs {
  _id: ObjectId
  collectionMethod: string
  status: string
  updatedAt?: Date
}

export interface DeleteOrderArgs {
  _id: ObjectId
}
