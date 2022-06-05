import { ObjectId } from 'mongodb'

export interface WebsiteText {
  _id?: ObjectId
  content?: string
  type?: string
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
