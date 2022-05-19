import { Context } from 'types/context'
import { ProductVariant } from 'types/productVariant'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<ProductVariant[]> => {
  const productVariants: any = await context.database.productVariants.find({})
  return productVariants
}
