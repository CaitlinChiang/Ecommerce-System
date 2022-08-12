import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { DeleteProductCategoryArgs } from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductCategoryArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PRODUCT_CATEGORY,
    context
  })

  await context.database.productCategories.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await createAuditLog(AuditLogAction.DELETE_PRODUCT_CATEGORY, context)
}
