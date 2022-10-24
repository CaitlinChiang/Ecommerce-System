import { ObjectId } from 'mongodb'

export interface City {
  _id?: ObjectId
  name?: string
  shippingFee?: number
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
}

export interface GetCityArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
}

export interface CreateCityArgs {
  name: string
  shippingFee: number
  createdAt?: Date
  createdBy?: ObjectId
}

export interface UpdateCityArgs {
  _id: ObjectId | string
  name: string
  shippingFee: number | string
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteCityArgs {
  _id: ObjectId
}
