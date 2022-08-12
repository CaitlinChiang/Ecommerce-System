import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { DeleteProductVariantArgs } from '../../../../types/productVariant'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PRODUCT_VARIANT,
    context
  })

  await deleteImage({ imageUrl: args?.imageUrl })

  await context.database.productVariants.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await createAuditLog(AuditLogAction.DELETE_PRODUCT_VARIANT, context)
}
