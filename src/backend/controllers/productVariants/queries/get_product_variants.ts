import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  await authenticateUser({ admin: false, context })

  const productVariants: ProductVariant[] = await context.database.productVariants
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return productVariants
}
