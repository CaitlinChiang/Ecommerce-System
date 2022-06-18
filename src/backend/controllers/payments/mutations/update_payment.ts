import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Payment, UpdatePaymentArgs } from '../../../../types/payment'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { deleteImage } from '../../../_utils/handleImages/delete'

export default async (
  _root: undefined,
  args: UpdatePaymentArgs,
  context: Context
): Promise<Payment> => {
  authenticateUser({ admin: true }, context)

  const { imageProof, ...modifiedArgs } = args

  await deleteImage(args.imageProofUrl)

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(args._orderId)
  })

  const payment: any = await context.database.payments.findOneAndUpdate(
    { _orderId: new ObjectId(args._orderId) },
    {
      $set: {
        ...mutationArgs(modifiedArgs, MutateAction.UPDATE),
        imageProofUrl: modifiedImageUrl
      }
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER_PAYMENT,
    paymentId: payment._id,
    ...auditArgs(context)
  })

  return payment
}
