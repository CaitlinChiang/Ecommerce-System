import { Context } from '../../../../types/setup/context'
import { CreateProductCategoryArgs } from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createData } from '../../../_utils/handleData/createData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateProductCategoryArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.CREATE_PRODUCT_CATEGORY)

  await createData(context, args, 'productCategories')

  await createAuditLog(context, AuditLogAction.CREATE_PRODUCT_CATEGORY)
}
