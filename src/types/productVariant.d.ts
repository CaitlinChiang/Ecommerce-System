import { ObjectId } from "mongodb";

export interface ProductVariant {
  _id?: ObjectId
  image?: File
  imageUrl?: string
  name?: string
  price?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface CreateProductVariantArgs {
  _id?: ObjectId
  image: File
  name: string
  price: number
  createdAt?: Date
}

export interface UpdateProductVariantArgs {
  _id: ObjectId
  image?: File
  name?: string
  price?: number
  updatedAt?: Date
}

export interface DeleteProductVariantArgs {
  _id: ObjectId
  deletedAt?: Date
}
