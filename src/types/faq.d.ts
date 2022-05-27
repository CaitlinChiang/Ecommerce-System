import { ObjectId } from 'mongodb'

export interface FAQ {
  _id?: ObjectId
  answer?: string
  question?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetFAQArgs {
  _id: ObjectId
}

export interface CreateFAQArgs {
  answer: string
  question: string
  createdAt?: Date
}

export interface UpdateFAQArgs {
  _id: ObjectId
  answer: string
  question: string
  updatedAt?: Date
}

export interface DeleteFAQArgs {
  _id: ObjectId
}
