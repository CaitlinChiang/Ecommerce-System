import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  UpdateProductCategoryArgs
} from '../../../../types/productCategory'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_PRODUCT_CATEGORY)

  const productCategory: ProductCategory = await returnUpdatedData(
    context,
    args,
    'productCategories'
  )

  await createAuditLog(context, AuditLogAction.UPDATE_PRODUCT_CATEGORY)

  return productCategory
}
