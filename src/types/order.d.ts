import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { CartItem } from './cart'
import { DateRange } from './common/dateRange'
import { DeliveryAddress } from './common/deliveryAddress'
import { CreatePaymentArgs } from './payment'
import { User } from './user'
import { CollectionMethod } from '../frontend/_enums/collectionMethod'
import { OrderStatus } from '../backend/_enums/orderStatus'

export interface Order {
  _id?: ObjectId
  collectionMethod?: CollectionMethod
  deliveryAddress?: DeliveryAddress
  items?: CartItem[]
  payment?: Payment
  paymentId?: ObjectId
  status?: OrderStatus
  user?: User
  userId?: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface GetOrderArgs {
  _id?: ObjectId
  collectionMethod?: CollectionMethod
  dateRange?: DateRange
  paginateData?: PaginateDataArgs
  status?: OrderStatus
  userId?: ObjectId
}

export interface CreateOrderArgs {
  collectionMethod?: CollectionMethod
  deliveryAddress?: DeliveryAddress
  items: CartItem[]
  payment: CreatePaymentArgs
  status?: OrderStatus
  userId?: ObjectId
  createdAt?: Date
}

export interface UpdateOrderArgs {
  _id: ObjectId
  status: OrderStatus
  updatedAt?: Date
}

export interface DeleteOrderArgs {
  _id: ObjectId
}
