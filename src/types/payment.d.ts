import { ObjectId } from 'mongodb'
import { PaymentStatus } from '../backend/_enums/paymentStatus'

export interface Payment {
  _id?: ObjectId
  _orderId?: ObjectId
  amountDue?: number
  imageProof?: File
  imageProofUrl?: string
  paymentMethodId?: ObjectId
  shippingFee?: number
  status?: PaymentStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface CreatePaymentArgs {
  amountDue: number
  imageProof?: File
  imageProofUrl?: string
  paymentMethodId?: ObjectId
  shippingFee?: number
  status?: PaymentStatus
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _orderId: ObjectId
  imageProof?: File
  imageProofUrl?: string
  status: PaymentStatus
  updatedAt?: Date
}
