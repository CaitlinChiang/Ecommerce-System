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
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductArgs {
  _id: ObjectId
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
  updatedAt?: Date
}

export interface DeleteProductArgs {
  _id: ObjectId
  imageUrl?: string
}
