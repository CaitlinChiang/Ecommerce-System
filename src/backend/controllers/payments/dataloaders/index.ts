import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Payment } from '../../../../types/payment'
import byOrderId from './byOrderId'

export interface PaymentDataloaders {
  byOrderId: Dataloader<ObjectId, Payment, ObjectId[]>
}

export default (db: Database): PaymentDataloaders => ({
  byOrderId: new Dataloader(
    (ids: ObjectId[]): Promise<Payment[]> => byOrderId(db, ids)
  )
})
