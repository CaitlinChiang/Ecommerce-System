import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  CreateProductCategoryArgs
} from '../../../../types/productCategory'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

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
    productCategoryId: productCategory.insertedId,
    ...auditArgs(context)
  })

  return productCategory
}
