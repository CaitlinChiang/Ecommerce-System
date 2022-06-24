import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { PaymentMethod } from '../../../../types/paymentMethod'
import byId from './byId'

export interface PaymentMethodDataloaders {
  byId: Dataloader<ObjectId, PaymentMethod, ObjectId[]>
}

export default (db: Database): PaymentMethodDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<PaymentMethod[]> => byId(db, ids))
})
