import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface ProductVariant {
  _id?: ObjectId
  _productId?: ObjectId
  description?: string
  discount?: number
  expirationDate?: Date
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
  dateRange?: DateRange
  discount?: boolean
  paginateData?: PaginateDataArgs
  showPublic?: boolean
  stockQuantity?: StockQuantity
}

export interface CreateProductVariantArgs {
  _productId: ObjectId
  description?: string
  discount?: number
  expirationDate?: Date
  image?: Promise<FileUpload>
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  createdAt?: Date
}

export interface UpdateProductVariantArgs {
  _id: ObjectId
  _productId: ObjectId
  description?: string
  discount?: number
  expirationDate?: Date
  image?: Promise<FileUpload>
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
