import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface Review {
  _id?: ObjectId
  content?: string
  featured?: boolean
  username?: string
  createdAt?: Date
  createdBy?: ObjectId
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
}

export interface GetReviewArgs {
  featured?: boolean
  paginateData?: PaginateDataArgs
}

export interface CreateReviewArgs {
  content: string
  featured: boolean
  username: string
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateReviewArgs {
  _id: ObjectId
  featured: boolean
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteReviewArgs {
  _id: ObjectId
}
