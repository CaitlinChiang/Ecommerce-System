import { ObjectId } from 'mongodb'
import { DeliveryAddress } from './deliveryAddress'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Order {
  _id?: ObjectId
  collectionMethod?: string
  deliveryAddress?: DeliveryAddress
  payment?: Payment
  paymentId?: ObjectId
  productIds?: string[]
  products?: Product[]
  productVariantIds?: string[]
  productVariants?: ProductVariant[]
  status?: string
  user?: User
  userId?: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface GetOrderArgs {
  _id: ObjectId
  productIds?: string[]
  productVariantIds?: string[]
}

export interface CreateOrderArgs {
  collectionMethod?: string
  deliveryAddress?: DeliveryAddress
  payment?: Payment
  productIds?: string[]
  productVariantIds?: string[]
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
