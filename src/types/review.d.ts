import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface Review {
  _id?: ObjectId
  content?: string
  featured?: boolean
  username?: string
  createdAt?: Date
  updatedAt?: Date
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
}

export interface UpdateReviewArgs {
  _id: ObjectId
  featured: boolean
  updatedAt?: Date
}

export interface DeleteReviewArgs {
  _id: ObjectId
}
