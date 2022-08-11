import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from './actions/paginateData'
import { DateRange } from './common/dateRange'

export interface AuditLog {
  _id?: ObjectId
  action?: string
  orderId?: ObjectId
  createdAt?: Date
  createdBy?: ObjectId
  createdByEmail?: string
}

export interface GetAuditLogArgs {
  dateRange?: DateRange
  orderId?: ObjectId
  paginateData?: PaginateDataArgs
}
