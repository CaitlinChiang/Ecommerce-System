import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  DeleteProductCategoryArgs
} from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

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

  const productCategory: ProductCategory = await context.database.productCategories
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((productCategory) => productCategory.value)

  await createAuditLog(AuditLogAction.DELETE_PRODUCT_CATEGORY, context)

  return productCategory
}
