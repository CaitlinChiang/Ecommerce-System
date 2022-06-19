import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Payment } from '../../../../types/payment'
import byId from './byId'

export interface PaymentDataloaders {
  byId: Dataloader<ObjectId, Payment, ObjectId[]>
}

export default (db: Database): PaymentDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<Payment[]> => byId(db, ids))
})
