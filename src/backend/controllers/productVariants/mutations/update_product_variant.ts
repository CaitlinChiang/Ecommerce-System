import { Context } from 'types/context'
import { ProductVariant, UpdateProductVariantArgs } from 'types/productVariant'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const { _id, name, price } = args

  const updateProductVariant: Partial<UpdateProductVariantArgs> = {
    name: name,
    price: price,
    updatedAt: new Date()
  }

  const productVariant: any = await context.database.productVariants.findOneAndUpdate({ _id: _id }, updateProductVariant)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
