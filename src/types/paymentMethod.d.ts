import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface PaymentMethod {
  _id?: ObjectId
  name?: string
  details?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetPaymentMethodArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreatePaymentMethodArgs {
  name: string
  details: string
  createdAt?: Date
}

export interface UpdatePaymentMethodArgs {
  _id: ObjectId | string
  name: string
  details: string
  updatedAt?: Date
}

export interface DeletePaymentMethodArgs {
  _id: ObjectId
}
