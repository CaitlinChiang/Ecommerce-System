import { ObjectId } from "mongodb";

export interface AuditLog {
  _id?: ObjectId
  action?: string
  userId?: ObjectId
  createdAt?: Date
}

export interface CreateAuditLogArgs {
  _id: ObjectId
  action: string
  userId: ObjectId
  createdAt: Date
}
