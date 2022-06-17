import { ObjectId } from 'mongodb'

export interface WebsiteText {
  _id?: ObjectId
  content?: string
  type?: string
  updatedAt?: Date
}

export interface GetWebsiteTextArgs {
  _id?: ObjectId
  type?: string
}

export interface UpdateWebsiteTextArgs {
  _id: ObjectId
  content: string
  updatedAt?: Date
}
