import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { PaymentMethod } from '../../../../types/paymentMethod'

export default async (db: Database, ids: ObjectId[]): Promise<PaymentMethod[]> => {
  const paymentMethods: PaymentMethod[] = await db.paymentMethods
    .find({ _id: { $in: ids } })
    .toArray()

  const paymentMethodsById: { [id: string]: PaymentMethod } = {}

  paymentMethods.forEach((paymentMethod: PaymentMethod): void => {
    paymentMethodsById[String(paymentMethod._id)] = paymentMethod
  })

  return ids.map((id: ObjectId): PaymentMethod => paymentMethodsById[String(id)])
}
