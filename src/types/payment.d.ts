import { ObjectId } from 'mongodb'

export interface Payment {
  _id?: ObjectId
  _orderId?: ObjectId
  amountDue?: number
  method?: string
  imageProof?: File
  imageProofUrl?: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreatePaymentArgs {
  amountDue: number
  method: string
  imageProof?: File
  status?: string
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _orderId: ObjectId
  imageProof?: File
  status: string
  updatedAt?: Date
}
