import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  DeleteProductCategoryArgs
} from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

export default async (
  _root: undefined,
  args: DeleteProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PRODUCT_CATEGORY,
    context
  })

  const productCategory: any =
    await context.database.productCategories.findOneAndDelete({
      _id: new ObjectId(args._id)
    })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_CATEGORY,
    productCategoryId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return productCategory.value
}
