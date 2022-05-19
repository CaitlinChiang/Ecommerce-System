import { Context } from 'types/context'
import { ProductVariant, UpdateProductVariantArgs } from 'types/productVariant'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const updateProductVariant: Partial<UpdateProductVariantArgs> = {
    name: args.name,
    price: args.price,
    updatedAt: new Date()
  }

  const productVariant: any = await context.database.productVariants.findOneAndUpdate({ _id: args._id }, updateProductVariant)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdBy: context.currentUserId,
    createdAt: new Date()
  })

  return productVariant
}
