import { ObjectId } from 'mongodb'

export interface City {
  _id?: ObjectId
  name?: string
  shippingFee?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface GetCityArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreateCityArgs {
  name: string
  shippingFee: number
  createdAt?: Date
}

export interface UpdateCityArgs {
  _id: ObjectId
  name: string
  shippingFee: number
  updatedAt?: Date
}

export interface DeleteCityArgs {
  _id: ObjectId
}
