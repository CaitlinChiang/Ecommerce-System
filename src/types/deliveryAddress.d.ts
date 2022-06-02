import { ObjectId } from 'mongodb'

export interface DeliveryAddress {
  address?: string
  cityId?: ObjectId
}
