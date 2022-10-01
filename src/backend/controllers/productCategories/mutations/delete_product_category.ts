import { Context } from '../../../../types/setup/context'
import { DeleteProductCategoryArgs } from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductCategoryArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_PRODUCT_CATEGORY)

  await deleteData(context, args, 'productCategories')

  await createAuditLog(context, AuditLogAction.DELETE_PRODUCT_CATEGORY)
}
