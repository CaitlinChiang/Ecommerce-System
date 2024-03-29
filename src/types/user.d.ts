import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DeliveryAddress } from './common/deliveryAddress'
import { AdminPermission } from '../backend/_enums/adminPermission'
import { UserType } from '../backend/_enums/userType'

export interface User {
  _id?: ObjectId
  active?: boolean
  deliveryAddress?: DeliveryAddress
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  permissions?: AdminPermission[]
  phoneNumber?: string
  token?: string
  type?: type
  verificationCode?: string
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
  updatedAt?: Date
  updatedBy?: ObjectId
  updatedByEmail?: string
  deletedAt?: Date
  deletedBy?: ObjectId
  deletedByEmail?: string
}

export interface SignInUserArgs {
  email: string
  password: string
  type: UserType
}

export interface JWTArgs {
  _id: string
  iat: number
  exp: number
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
  deliveryAddress: DeliveryAddress
  email: string
  firstName: string
  lastName: string
  permissions?: AdminPermission[]
  phoneNumber: string
  updatedAt?: Date
  updatedBy?: ObjectId
}

export interface DeleteUserArgs {
  _id: ObjectId
  type: UserType
  deletedAt?: Date
  deletedBy?: ObjectId
}

export interface ForgotPasswordArgs {
  email: string
  type: UserType
}

export interface ResetPasswordArgs {
  email: string
  newPassword: string
  oldPassword?: string
  verificationCode?: string
}
