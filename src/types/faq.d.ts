import { ObjectId } from 'mongodb'

export interface FAQ {
  _id?: ObjectId
  question?: string
  answer?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetFAQArgs {
  _id: ObjectId
}

export interface CreateFAQArgs {
  question: string
  answer: string
  createdAt?: Date
}

export interface UpdateFAQArgs {
  _id: ObjectId
  question: string
  answer: string
  updatedAt?: Date
}

export interface DeleteFAQArgs {
  _id: ObjectId
}
