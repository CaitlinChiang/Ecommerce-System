import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { deleteImage } from '../../../_utils/handleImages/delete'

export const deletePayment = async (
  context: Context,
  orderId: ObjectId,
  paymentId: ObjectId
) => {
  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER_PAYMENT,
    paymentId: paymentId,
    ...auditArgs(context)
  })

  const imageProofUrl = String(orderId).substring(String(orderId).length - 5)

  await deleteImage('payments/' + imageProofUrl)

  await context.database.payments.findOneAndDelete({ _orderId: orderId })
}
