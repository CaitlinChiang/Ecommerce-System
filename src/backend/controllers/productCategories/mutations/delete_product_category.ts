import { Context } from 'types/context'
import { ProductCategory, DeleteProductCategoryArgs } from 'types/productCategory'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_CATEGORY,
    productCategoryId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const productCategory: any = await context.database.productCategories.findOneAndDelete({ _id: _id })
  
  return productCategory
}
