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
  updatedAt?: Date
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
  description?: string
  discount?: number
  expirationDate?: Date
  featured: boolean
  image: Promise<FileUpload>
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id: ObjectId
  categoryId: ObjectId
  description?: string
  discount?: number
  expirationDate?: Date
  featured: boolean
  image?: Promise<FileUpload>
  imageUrl: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity: number
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl: string
}
