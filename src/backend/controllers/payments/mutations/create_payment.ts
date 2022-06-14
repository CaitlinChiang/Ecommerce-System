import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreatePaymentArgs } from '../../../../types/payment'
import { PaymentStatus } from '../../../../types/_enums/paymentStatus'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { uploadImage } from '../../../_utils/handleImages/upload'

export const createPayment = async (
  context: Context,
  orderId: ObjectId,
  payment: CreatePaymentArgs
) => {
  const { imageProof, ...modifiedArgs } = payment

  const imageProofUrl = await uploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(orderId)
  })

  await context.database.payments.insertOne({
    _orderId: orderId,
    ...modifiedArgs,
    imageProofUrl,
    status: PaymentStatus.COMPLETE,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    paymentId: orderId,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })
}
