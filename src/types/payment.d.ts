import { ObjectId } from "mongodb";

export interface Payment {
  _id?: ObjectId
  amount?: number
  method?: string
  status?: string
  createdAt?: Date
}

export interface CreatePaymentArgs {
  _id?: ObjectId
  amount: number
  method: string
  status?: string
  createdAt?: Date
}

export interface UpdatePaymentArgs {
  _id?: ObjectId
  status?: string
  updatedAt?: Date
}
