import { ObjectId } from 'mongodb'
import { City } from './city'

export interface DeliveryAddress {
  address?: string
  cityId?: ObjectId
}
