import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreatePaymentArgs } from '../../../../types/payment'
import { PaymentStatus } from '../../../../types/_enumsBackend/paymentStatus'
import { UploadImageType } from '../../../../types/_enumsBackend/uploadImageType'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
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
    ...mutationArgs(modifiedArgs, MutateAction.CREATE),
    _orderId: orderId,
    imageProofUrl,
    status: PaymentStatus.COMPLETE
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    paymentId: orderId,
    ...auditArgs(context)
  })
}
