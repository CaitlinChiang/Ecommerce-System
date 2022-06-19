import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Payment } from '../../../../types/payment'

export default async (db: Database, ids: ObjectId[]): Promise<Payment[]> => {
  const payments: Payment[] = await db.payments
    .find({ _orderId: { $in: ids } })
    .toArray()

  const paymentsById: { [id: string]: Payment } = {}

  payments.forEach((payment: Payment): void => {
    paymentsById[String(payment._id)] = payment
  })

  return ids.map((id: ObjectId): Payment => paymentsById[String(id)])
}
