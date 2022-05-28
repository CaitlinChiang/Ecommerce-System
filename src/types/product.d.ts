import { ObjectId } from 'mongodb'
import { ProductVariant } from './productVariant'

export interface Product {
  _id?: ObjectId
  category?: string
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductArgs {
  _id: ObjectId
}

export interface CreateProductArgs {
  category: string
  image?: File
  imageUrl?: string
  name: string
  price: number
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id: ObjectId
  category: string
  image?: File
  imageUrl?: string
  name: string
  price: number
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl?: string
}
