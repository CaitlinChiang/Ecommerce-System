import { Context } from 'types/context'
import { ProductCategory, CreateProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  const productCategory: any = await context.database.productCategories.insertOne({
    ...args,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_CATEGORY,
    productCategoryId: productCategory._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productCategory
}
