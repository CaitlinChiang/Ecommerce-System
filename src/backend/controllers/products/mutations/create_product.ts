import { Context } from 'types/context'
import { Product, CreateProductArgs } from 'types/product'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateProductArgs,
  context: Context
): Promise<Product> => {
  const createProduct: CreateProductArgs = {
    name: args.name,
    price: args.price,
    type: args.type,
    createdAt: new Date()
  }

  const product: any = await context.database.products.insertOne(createProduct)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT,
    productId: product._id,
    createdBy: context.currentUserId,
    createdAt: new Date()
  })

  return product
}
