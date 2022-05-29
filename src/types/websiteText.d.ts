import { ObjectId } from 'mongodb'
import { DeliveryAddress } from './deliveryAddress'

export interface WebsiteText {
  _id?: ObjectId
  type?: string
  content?: string
}

export interface GetWebsiteTextArgs {
  type: string
}

export interface UpdateWebsiteTextArgs {
  content: string
  type: string
  updatedAt?: Date
}
