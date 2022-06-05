import { ObjectId } from 'mongodb'

export interface PaymentMethod {
  _id?: ObjectId
  name?: string
  details?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetPaymentMethodArgs {
  _id: ObjectId
}

export interface CreatePaymentMethodArgs {
  name: string
  details: string
  createdAt?: Date
}

export interface UpdatePaymentMethodArgs {
  _id: ObjectId
  name: string
  details: string
  updatedAt?: Date
}

export interface DeletePaymentMethodArgs {
  _id: ObjectId
}
