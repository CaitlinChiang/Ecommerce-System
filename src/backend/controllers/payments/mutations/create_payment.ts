import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreatePaymentArgs } from '../../../../types/payment'
import { PaymentStatus } from '../../../_enums/paymentStatus'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { sendPaymentReceipt } from '../../../_utils/handleMail/send/paymentReceipt'

export const createPayment = async (
  orderId: ObjectId,
  paymentArgs: CreatePaymentArgs,
  context: Context
): Promise<void> => {
  const { imageProof, ...modifiedArgs } = paymentArgs

  const imageProofUrl = await uploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(orderId)
  })

  await context.database.payments.insertOne({
    ...mutateArgs(modifiedArgs, MutateAction.CREATE),
    _orderId: orderId,
    imageProofUrl,
    status: PaymentStatus.COMPLETE
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    orderId,
    ...auditArgs(context)
  })

  await sendPaymentReceipt(orderId, modifiedArgs, context)
}
