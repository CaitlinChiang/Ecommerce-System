import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface ProductCategory {
  _id?: ObjectId
  name?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductCategoryArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreateProductCategoryArgs {
  name: string
  createdAt?: Date
}

export interface UpdateProductCategoryArgs {
  _id: ObjectId
  name: string
  updatedAt?: Date
}

export interface DeleteProductCategoryArgs {
  _id: ObjectId
}
