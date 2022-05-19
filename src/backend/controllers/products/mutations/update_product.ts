import { Context } from 'types/context'
import { Product, UpdateProductArgs } from 'types/product'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateProductArgs,
  context: Context
): Promise<Product> => {
  const updateProduct: Partial<UpdateProductArgs> = {
    name: args.name,
    price: args.price,
    type: args.type,
    updatedAt: new Date()
  }

  const product: any = await context.database.products.findOneAndUpdate({ _id: args._id }, updateProduct)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT,
    productId: product._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return product
}
