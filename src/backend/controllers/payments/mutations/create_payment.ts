import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreatePaymentArgs } from '../../../../types/payment'
import { City } from '../../../../types/city'
import { PaymentStatus } from '../../../_enums/paymentStatus'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'

export const createPayment = async (
  orderId: ObjectId,
  paymentArgs: CreatePaymentArgs,
  cityId: ObjectId,
  context: Context
): Promise<void> => {
  const { imageProof, ...modifiedArgs } = paymentArgs

  const imageProofUrl = await uploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(orderId)
  })

  if (cityId) {
    const city: City = await context.database.cities.findOne({
      _id: new ObjectId(cityId)
    })
    modifiedArgs.shippingFee = city?.shippingFee
  }

  await context.database.payments.insertOne({
    ...mutationArgs(modifiedArgs, MutateAction.CREATE),
    _orderId: orderId,
    imageProofUrl,
    status: PaymentStatus.COMPLETE
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    orderId,
    ...auditArgs(context)
  })
}
