import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { deleteImage } from '../../../_utils/handleImages/delete'

export const deletePayment = async (
  orderId: ObjectId,
  context: Context
): Promise<void> => {
  const imageProofUrl = String(orderId).substring(String(orderId).length - 5)

  await deleteImage({ imageUrl: 'payments/' + imageProofUrl })

  await context.database.payments.findOneAndDelete({
    _orderId: new ObjectId(orderId)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER_PAYMENT,
    orderId: new ObjectId(orderId),
    ...auditArgs(context)
  })
}
