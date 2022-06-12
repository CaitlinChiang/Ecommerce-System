import { Context } from '../../../../types/_setup/context'
import { Payment, UpdatePaymentArgs } from '../../../../types/payment'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleUploadImage } from '../../../_utils/handleImages/uploadImage'
import { handleDeleteImage } from '../../../_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: UpdatePaymentArgs,
  context: Context
): Promise<Payment> => {
  authenticateUser({ admin: true }, context)

  const { imageProof, ...modifiedArgs } = args

  await handleDeleteImage(args.imageProofUrl)
  const modifiedImageUrl = await handleUploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(args._orderId)
  })

  const payment: any = await context.database.payments.findOneAndUpdate(
    { _orderId: args._orderId },
    {
      ...modifiedArgs,
      imageProof: modifiedImageUrl,
      updatedAt: new Date()
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER_PAYMENT,
    paymentId: payment._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return payment
}
