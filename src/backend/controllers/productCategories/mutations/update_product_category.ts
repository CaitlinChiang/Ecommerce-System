import { Context } from 'types/context'
import { ProductCategory, UpdateProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  const { _id, name } = args

  const updateProductCategory: Partial<UpdateProductCategoryArgs> = {
    name: name,
    updatedAt: new Date()
  }
  const productCategory: any = await context.database.productCategories.findOneAndUpdate({ _id: _id }, updateProductCategory)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_CATEGORY,
    productCategoryId: productCategory._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productCategory
}
