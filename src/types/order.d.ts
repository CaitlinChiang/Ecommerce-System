import { ObjectId } from "mongodb";
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Order {
  _id?: ObjectId
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
}

export interface CreateOrderArgs {
  _id?: ObjectId
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
  status: string
}

export interface DeleteOrderArgs {
  _id: ObjectId
}
