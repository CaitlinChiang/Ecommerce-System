import { Context } from 'types/context'
import { ProductVariant, DeleteProductVariantArgs } from 'types/productVariant'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT_VARIANT,
    productVariantId: args._id,
    createdBy: context.currentUserId,
    createdAt: new Date()
  })

  const productVariant: any = await context.database.productVariants.findOneAndDelete({ _id: args._id })

  return productVariant
}
