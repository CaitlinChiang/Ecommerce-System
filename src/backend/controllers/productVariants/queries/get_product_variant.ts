import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await authenticateUser(context, false)

  const productVariant: ProductVariant = await returnData(
    context,
    args,
    'productVariants'
  )
  return productVariant
}
