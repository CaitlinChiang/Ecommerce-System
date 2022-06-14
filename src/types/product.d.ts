import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'

export interface Product {
  _id?: ObjectId
  category?: string
  categoryId?: ObjectId
  description?: string
  expirationDate?: Date
  featured?: boolean
  image?: File
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
  categoryId?: ObjectId
  featured?: boolean
  paginateData?: PaginateDataArgs
  showPublic?: boolean
  stockQuantity?: number
}

export interface CreateProductArgs {
  categoryId: ObjectId
  description?: string
  expirationDate?: Date
  featured: boolean
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity?: number
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id: ObjectId
  categoryId: ObjectId
  description?: string
  expirationDate?: Date
  featured: boolean
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  stockQuantity?: number
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl?: string
}
