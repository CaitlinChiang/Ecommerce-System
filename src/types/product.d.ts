import { ObjectId } from "mongodb";

export interface Product {
  _id?: ObjectId
  price?: number
  
  createdAt?: Date
}

export interface CreateProductArgs {
  _id?: ObjectId
  createdAt?: Date
}

export interface UpdateProductArgs {
  _id?: ObjectId
  updatedAt?: Date
}

export interface DeleteProductArgs {

}
