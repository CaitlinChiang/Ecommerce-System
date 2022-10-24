import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface FAQ {
  _id?: ObjectId
  answer?: string
  question?: string
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
}

export interface GetFAQArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreateFAQArgs {
  answer: string
  question: string
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateFAQArgs {
  _id: ObjectId | string
  answer: string
  question: string
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteFAQArgs {
  _id: ObjectId
}
