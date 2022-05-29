import { ObjectId } from 'mongodb'
import { DeliveryAddress } from './deliveryAddress'

export interface WebsiteText {
  _id?: ObjectId
  content?: string
  type?: string
}

export interface GetWebsiteTextArgs {
  type: string
}

export interface UpdateWebsiteTextArgs {
  _id: ObjectId
  content: string
  updatedAt?: Date
}
