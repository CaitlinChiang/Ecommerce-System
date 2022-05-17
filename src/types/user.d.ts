import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  address?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string
  type?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface SignInArgs {
  email: string
  password: string
}

export interface CreateUserArgs {
  _id?: ObjectId
  address?: string
  email: string
  firstName: string
  lastName: string
  password: string
  phoneNumber: string
  type: string
  createdAt?: Date
}

export interface UpdateUserArgs {
  _id?: ObjectId
  address?: string
  email?: string
  password?: string
  phoneNumber?: string
  updatedAt?: Date
}

export interface DeleteUserArgs {
  _id: ObjectId
  deletedAt?: Date
}
