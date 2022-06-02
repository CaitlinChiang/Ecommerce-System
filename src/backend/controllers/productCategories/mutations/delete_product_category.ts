import { Context } from 'types/context'
import { ProductCategory, DeleteProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: DeleteProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_CATEGORY,
    productCategoryId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const productCategory: any = await context.database.productCategories.findOneAndDelete({ _id: args._id })
  return productCategory
}
