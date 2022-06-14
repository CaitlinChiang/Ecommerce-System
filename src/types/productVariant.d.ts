import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface ProductVariant {
  _id?: ObjectId
  _productId?: ObjectId
  expirationDate?: Date
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  showPublic?: boolean
  stockQuantity?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductVariantArgs {
  _id?: ObjectId
  _productId?: ObjectId
  imageUrl?: string
  showPublic?: boolean
  paginateData?: PaginateDataArgs
}

export interface CreateProductVariantArgs {
  _productId: ObjectId
  expirationDate?: Date
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  createdAt?: Date
}

export interface UpdateProductVariantArgs {
  _id: ObjectId
  _productId: ObjectId
  expirationDate?: Date
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  updatedAt?: Date
}

export interface DeleteProductVariantArgs {
  _id: ObjectId
  imageUrl?: string
}
