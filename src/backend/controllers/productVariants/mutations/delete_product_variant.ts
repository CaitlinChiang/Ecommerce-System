import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  DeleteProductVariantArgs
} from '../../../../types/productVariant'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  await deleteImage(args.imageUrl)

  const productVariant: any =
    await context.database.productVariants.findOneAndDelete({
      _id: new ObjectId(args._id)
    })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_VARIANT,
    productVariantId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return productVariant
}
