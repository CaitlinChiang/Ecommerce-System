import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { PaymentMethod } from './paymentMethod'
import { PaymentStatus } from '../backend/_enums/paymentStatus'

export interface Payment {
  _id?: ObjectId
  _orderId?: ObjectId
  amountDue?: number
  imageProofUrl?: string
  paymentMethod?: PaymentMethod
  paymentMethodId?: ObjectId
  shippingFee?: number
  status?: PaymentStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface CreatePaymentArgs {
  amountDue: number
  imageProof: Promise<FileUpload>
  paymentMethodId: ObjectId
  shippingFee: number
  status?: PaymentStatus
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _orderId: ObjectId
  imageProof?: Promise<FileUpload>
  imageProofUrl?: string
  status?: PaymentStatus
  updatedAt?: Date
}
