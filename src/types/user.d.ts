import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DeliveryAddress } from './common/deliveryAddress'
import { UserType } from '../backend/_enums/userType'

export interface User {
  _id?: ObjectId
  active?: boolean
  deliveryAddress?: DeliveryAddress
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string
  token?: string
  type?: UserType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
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
  active?: boolean
  paginateData?: PaginateDataArgs
  type?: UserType
}

export interface CreateUserArgs {
  active?: boolean
  deliveryAddress?: DeliveryAddress
  email: string
  firstName: string
  lastName: string
  password: string
  phoneNumber: string
  type: UserType
  createdAt?: Date
}

export interface UpdateUserArgs {
  _id: ObjectId
  active?: boolean
  deliveryAddress?: DeliveryAddress
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string
  updatedAt?: Date
}

export interface DeleteUserArgs {
  _id: ObjectId
  deletedAt?: Date
}
