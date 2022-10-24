import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { StockQuantity } from './common/stockQuantity'

export interface Product {
  _id?: ObjectId
  category?: string
  categoryId?: ObjectId
  description?: string
  discount?: number
  expirationDate?: Date
  featured?: boolean
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

export interface GetProductArgs {
  _id?: ObjectId
  categoryIds?: ObjectId[]
  dateRange?: DateRange
  discount?: boolean
  featured?: boolean
  paginateData?: PaginateDataArgs
  showPublic?: boolean
  stockQuantity?: StockQuantity
}

export interface CreateProductArgs {
  categoryId: ObjectId
  description: string
  discount?: number
  expirationDate?: Date
  featured: boolean
  image: Promise<FileUpload>
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateProductArgs {
  _id: ObjectId | string
  categoryId: ObjectId
  description: string
  discount?: number | string
  expirationDate?: Date
  featured: boolean
  image?: Promise<FileUpload>
  imageUrl: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl: string
}
