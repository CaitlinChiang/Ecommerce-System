import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface ProductCategory {
  _id?: ObjectId
  name?: string
  showPublic?: boolean
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
}

export interface GetProductCategoryArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
  showPublic?: boolean
}

export interface CreateProductCategoryArgs {
  name: string
  showPublic: boolean
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateProductCategoryArgs {
  _id: ObjectId | string
  name: string
  showPublic: boolean
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteProductCategoryArgs {
  _id: ObjectId
}
