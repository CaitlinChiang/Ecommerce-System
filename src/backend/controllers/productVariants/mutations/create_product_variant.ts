import { Context } from 'types/context'
import { ProductVariant, CreateProductVariantArgs } from 'types/productVariant'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const createProductVariant: CreateProductVariantArgs = {
    _productId: args._productId,
    name: args.name,
    price: args.price,
    createdAt: new Date()
  }

  const productVariant: any = await context.database.productVariants.insertOne(createProductVariant)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_VARIANT,
    productId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
