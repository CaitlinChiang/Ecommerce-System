import { ObjectId } from 'mongodb'

export interface Product {
  _id?: ObjectId
  category?: string
  description?: string
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
  category?: string
  featured?: boolean
  showPublic?: boolean
  stockQuantity?: number
}

export interface CreateProductArgs {
  category: string
  description?: string
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
  category: string
  description?: string
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
