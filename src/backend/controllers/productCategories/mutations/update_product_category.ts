import { Context } from 'types/context'
import { ProductCategory, UpdateProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: UpdateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  const productCategory: any =
    await context.database.productCategories.findOneAndUpdate(
      { _id: args._id },
      { ...args, updatedAt: new Date() }
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_CATEGORY,
    productCategoryId: productCategory._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productCategory
}
