import { ObjectId } from 'mongodb'

export interface Payment {
  _id?: ObjectId
  _orderId?: ObjectId
  amountDue?: number
  imageProof?: File
  imageProofUrl?: string
  method?: string
  shippingFee?: number
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreatePaymentArgs {
  amountDue: number
  imageProof?: File
  imageProofUrl?: string
  method: string
  shippingFee?: number
  status?: string
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _orderId: ObjectId
  imageProof?: File
  imageProofUrl?: string
  status: string
  updatedAt?: Date
}
