import { ObjectId } from 'mongodb'
import { ProductVariant } from './productVariant'

export interface Product {
  _id?: ObjectId
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  type?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductArgs {
  _id: ObjectId
}

export interface CreateProductArgs {
  image?: File
  imageUrl?: string
  name: string
  price: number
  type: string
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id: ObjectId
  image?: File
  imageUrl?: string
  name: string
  price: number
  type: string
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl?: string
}
