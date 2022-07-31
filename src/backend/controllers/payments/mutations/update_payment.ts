import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Payment, UpdatePaymentArgs } from '../../../../types/payment'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { deleteImage } from '../../../_utils/handleImages/delete'

export default async (
  _root: undefined,
  args: UpdatePaymentArgs,
  context: Context
): Promise<Payment> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_PAYMENT,
    context
  })

  const { imageProof, ...modifiedArgs } = args

  await deleteImage({
    image: imageProof,
    imageUrl: args.imageProofUrl,
    shouldExist: true
  })

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(args._orderId)
  })

  const payment: any = await context.database.payments.findOneAndUpdate(
    { _orderId: new ObjectId(args._orderId) },
    {
      $set: {
        ...mutateArgs(modifiedArgs, MutateAction.UPDATE),
        imageProofUrl: modifiedImageUrl
      }
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER_PAYMENT,
    orderId: new ObjectId(args._orderId),
    ...auditArgs(context)
  })

  return payment.value
}
