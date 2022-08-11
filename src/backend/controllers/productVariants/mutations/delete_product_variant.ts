import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  DeleteProductVariantArgs
} from '../../../../types/productVariant'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PRODUCT_VARIANT,
    context
  })

  await deleteImage({ imageUrl: args?.imageUrl })

  const productVariant: ProductVariant = await context.database.productVariants
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((productVariant) => productVariant.value)

  await createAuditLog(AuditLogAction.DELETE_PRODUCT_VARIANT, context)

  return productVariant
}
