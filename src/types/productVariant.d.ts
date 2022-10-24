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
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
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
  _productId: ObjectId | string
  description: string
  discount?: number | string
  expirationDate?: Date
  image?: Promise<FileUpload>
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateProductVariantArgs {
  _id: ObjectId | string
  _productId?: ObjectId
  description: string
  discount?: number | string
  expirationDate?: Date
  image?: Promise<FileUpload>
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteProductVariantArgs {
  _id: ObjectId
  imageUrl?: string
}
