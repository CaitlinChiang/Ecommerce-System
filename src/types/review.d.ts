import { ObjectId } from 'mongodb'

export interface Review {
  _id?: ObjectId
  content?: string
  featured?: boolean
  username?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateReviewArgs {
  content: string
  featured?: boolean
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
