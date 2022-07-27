import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  UpdateProductCategoryArgs
} from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_PRODUCT_CATEGORY,
    context
  })

  const productCategory: any =
    await context.database.productCategories.findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutationArgs(args, MutateAction.UPDATE) }
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_CATEGORY,
    productCategoryId: new ObjectId(productCategory._id),
    ...auditArgs(context)
  })

  return productCategory
}
