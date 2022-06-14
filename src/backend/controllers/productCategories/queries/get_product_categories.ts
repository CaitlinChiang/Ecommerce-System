import { Context } from '../../../../types/setup/context'
import { ProductCategory } from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<ProductCategory[]> => {
  authenticateUser({ admin: false }, context)

  const productCategories: any = await context.database.productCategories.find(
    queryArgs(args)
  )
  return productCategories
}
