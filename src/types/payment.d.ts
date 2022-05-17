import { ObjectId } from 'mongodb'

export interface Payment {
  _id?: ObjectId
  amount?: number
  method?: string
  proofImage?: File
  proofImageUrl?: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreatePaymentArgs {
  _id?: ObjectId
  amount: number
  method: string
  proofImage?: File
  status?: string
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _id?: ObjectId
  proofImage?: File
  status?: string
  updatedAt?: Date
}
