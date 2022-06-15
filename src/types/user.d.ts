import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DeliveryAddress } from './common/deliveryAddress'

export interface User {
  _id?: ObjectId
  address?: DeliveryAddress
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string
  token?: string
  type?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserPermissionArgs {
  admin: boolean
}

export interface SignInUserArgs {
  email: string
  password: string
}

export interface GetUserArgs {
  _id?: ObjectId
  paginateData?: PaginateDataArgs
  type?: string
}

export interface CreateUserArgs {
  address?: DeliveryAddress
  email: string
  firstName: string
  lastName: string
  password: string
  phoneNumber: string
  type: string
  createdAt?: Date
}

export interface UpdateUserArgs {
  _id: ObjectId
  address?: DeliveryAddress
  email: string
  password: string
  phoneNumber: string
  updatedAt?: Date
}

export interface DeleteUserArgs {
  _id: ObjectId
}
