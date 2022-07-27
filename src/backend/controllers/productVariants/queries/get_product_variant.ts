import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await authenticateUser({ admin: false, context })

  const productVariant: ProductVariant =
    await context.database.productVariants.findOne({
      _id: new ObjectId(args._id)
    })

  return productVariant
}
