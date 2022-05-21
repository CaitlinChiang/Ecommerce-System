import { Context } from 'types/context'
import { Product, DeleteProductArgs } from 'types/product'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<Product> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT,
    productId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const product: any = await context.database.products.findOneAndDelete({ _id: _id })

  return product
}
