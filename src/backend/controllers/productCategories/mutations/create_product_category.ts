import { Context } from 'types/context'
import { ProductCategory, CreateProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  const { name } = args

  const createProductCategory: CreateProductCategoryArgs = {
    name: name,
    createdAt: new Date()
  }
  const productCategory: any = await context.database.productCategories.insertOne(createProductCategory)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_CATEGORY,
    productCategoryId: productCategory._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productCategory
}
