import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface ProductCategory {
  _id?: ObjectId
  name?: string
  showPublic?: boolean
  createdAt?: Date
  updatedAt?: Date
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
}

export interface UpdateProductCategoryArgs {
  _id: ObjectId
  name: string
  showPublic: boolean
  updatedAt?: Date
}

export interface DeleteProductCategoryArgs {
  _id: ObjectId
}
