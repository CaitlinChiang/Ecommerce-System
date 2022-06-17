import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  CreateProductCategoryArgs
} from '../../../../types/productCategory'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  const productCategory: any = await context.database.productCategories.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_CATEGORY,
    productCategoryId: productCategory._id,
    ...auditArgs(context)
  })

  return productCategory
}
