import { Context } from 'types/context'
import { ProductVariant, DeleteProductVariantArgs } from 'types/productVariant'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_VARIANT,
    productVariantId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const productVariant: any = await context.database.productVariants.findOneAndDelete({ _id: _id })
  
  return productVariant
}
