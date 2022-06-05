import { Context } from '../../../../types/context'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const productCategoriesCount: number =
    await context.database.productCategories.countDocuments()
  return productCategoriesCount
}
