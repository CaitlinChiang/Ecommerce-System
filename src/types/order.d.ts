import { ObjectId } from "mongodb";
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Order {
  _id?: ObjectId
  collectionMethod?: string
  payment?: Payment
  paymentId?: ObjectId
  product?: Product
  productId?: ObjectId
  productVariant?: ProductVariant
  productVariantId?: ObjectId
  status?: string
  user?: User
  userId?: ObjectId
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface CreateOrderArgs {
  _id?: ObjectId
  collectionMethod?: string
  paymentId: ObjectId
  productId: ObjectId
  productVariantId?: ObjectId
  status?: string
  user?: User
  userId?: ObjectId
  createdAt?: Date
}

export interface UpdateOrderArgs {
  _id: ObjectId
  collectionMethod?: string
  status?: string
  updatedAt?: Date
}

export interface DeleteOrderArgs {
  _id: ObjectId
  deletedAt?: Date
}
