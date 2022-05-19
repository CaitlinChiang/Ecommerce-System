import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const productVariantsCount: number = await context.database.productVariants.countDocuments()
  return productVariantsCount
}
