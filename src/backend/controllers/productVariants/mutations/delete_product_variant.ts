import { Context } from '../../../../types/setup/context'
import { DeleteProductVariantArgs } from '../../../../types/productVariant'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_PRODUCT_VARIANT)

  await deleteImage({ imageUrl: args?.imageUrl })

  await deleteData(context, args, 'productVariants')

  await createAuditLog(context, AuditLogAction.DELETE_PRODUCT_VARIANT)
}
