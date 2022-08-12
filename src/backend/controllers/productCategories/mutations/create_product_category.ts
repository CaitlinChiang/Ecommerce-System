import { Context } from '../../../../types/setup/context'
import { CreateProductCategoryArgs } from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateProductCategoryArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_PRODUCT_CATEGORY,
    context
  })

  await context.database.productCategories.insertOne(
    mutateArgs(args, MutateAction.CREATE)
  )

  await createAuditLog(AuditLogAction.CREATE_PRODUCT_CATEGORY, context)
}
