import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { handleDeleteImage } from '../../../_utils/handleImages/deleteImage'

export const deletePayment = async (
  context: Context,
  orderId: ObjectId,
  paymentId: ObjectId
) => {
  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER_PAYMENT,
    paymentId: paymentId,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const imageProofUrl = String(orderId).substr(String(orderId).length - 5)

  await handleDeleteImage('payments/' + imageProofUrl)

  await context.database.payments.findOneAndDelete({ _orderId: orderId })
}
