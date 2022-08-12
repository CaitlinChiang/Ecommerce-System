import { ObjectId } from 'mongodb'
import { WebsiteTextType } from '../frontend/_enums/websiteTextType'

export interface WebsiteText {
  _id?: ObjectId
  content?: string
  type?: WebsiteTextType
  updatedAt?: Date
}

export interface GetWebsiteTextArgs {
  type: WebsiteTextType
}

export interface UpdateWebsiteTextArgs {
  _id?: ObjectId
  content: string
  type: WebsiteTextType
  updatedAt?: Date
}
