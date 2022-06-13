import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  DeleteProductVariantArgs
} from '../../../../types/productVariant'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleDeleteImage } from '../../../_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  await handleDeleteImage(args.imageUrl)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_VARIANT,
    productVariantId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const productVariant: any =
    await context.database.productVariants.findOneAndDelete({
      _id: args._id
    })
  return productVariant
}
