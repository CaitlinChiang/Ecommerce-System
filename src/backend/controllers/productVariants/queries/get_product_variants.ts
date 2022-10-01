import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  await authenticateUser(context, false)

  const productVariants: ProductVariant[] = await returnDataArray(
    context,
    args,
    'productVariants'
  )
  return productVariants
}
