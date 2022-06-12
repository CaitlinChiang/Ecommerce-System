import { ObjectId } from 'mongodb'
import { CartItem } from './cart'
import { DeliveryAddress } from './common/deliveryAddress'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Order {
  _id?: ObjectId
  collectionMethod?: string
  deliveryAddress?: DeliveryAddress
  items?: CartItem[]
  payment?: Payment
  paymentId?: ObjectId
  products?: Product[]
  productVariants?: ProductVariant[]
  status?: string
  user?: User
  userId?: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface GetOrderArgs {
  _id?: ObjectId
  items?: CartItem[]
  userId?: ObjectId
  startDate?: Date
  endDate?: Date
}

export interface CreateOrderArgs {
  collectionMethod?: string
  deliveryAddress?: DeliveryAddress
  items: CartItem[]
  payment: Payment
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
  _paymentId: ObjectId
}
