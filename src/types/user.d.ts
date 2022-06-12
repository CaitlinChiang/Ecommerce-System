import { ObjectId } from 'mongodb'
import { DeliveryAddress } from './_common/deliveryAddress'

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

export interface JWTReturnUserArgs {
  _id: ObjectId
  type: string
  iat: number
  exp: number
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
