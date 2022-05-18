import { Context } from 'types/context'
import { Product } from 'types/product'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<Product> => {
  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT,
    productId: args._id,
    createdBy: context.currentUserId,
    createdAt: new Date()
  })

  const product: any = await context.database.products.findOneAndDelete({ _id: args._id })

  return product
}
