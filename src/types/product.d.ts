import { ObjectId } from 'mongodb'
import { ProductVariant } from './productVariant'

export interface Product {
  _id?: ObjectId
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  productVariants?: ProductVariant[]
  type?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface CreateProductArgs {
  _id?: ObjectId
  image: File
  name: string
  price: number
  type?: string
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id: ObjectId
  image?: File
  name?: string
  price?: number
  type?: string
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  deletedAt?: Date
}
