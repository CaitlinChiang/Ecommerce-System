import { ObjectId } from 'mongodb'

export interface ProductVariant {
  _id?: ObjectId
  _productId?: ObjectId
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  showPublic?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface GetProductVariantArgs {
  _id?: ObjectId
  _productId?: ObjectId
  showPublic?: boolean
}

export interface CreateProductVariantArgs {
  _productId: ObjectId
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  createdAt?: Date
}

export interface UpdateProductVariantArgs {
  _id: ObjectId
  _productId: ObjectId
  image?: File
  imageUrl?: string
  name: string
  price: number
  showPublic: boolean
  updatedAt?: Date
}

export interface DeleteProductVariantArgs {
  _id: ObjectId
  imageUrl?: string
}
