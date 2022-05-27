import { ObjectId } from 'mongodb'

export interface ProductCategory {
  _id?: ObjectId
  name?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductCategoryArgs {
  _id: ObjectId
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
