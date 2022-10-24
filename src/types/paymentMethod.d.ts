import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface PaymentMethod {
  _id?: ObjectId
  name?: string
  details?: string
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
}

export interface GetPaymentMethodArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreatePaymentMethodArgs {
  name: string
  details: string
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdatePaymentMethodArgs {
  _id: ObjectId | string
  name: string
  details: string
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeletePaymentMethodArgs {
  _id: ObjectId
}
