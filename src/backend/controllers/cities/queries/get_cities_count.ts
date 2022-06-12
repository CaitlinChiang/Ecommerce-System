import { Context } from '../../../../types/_setup/context'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const citiesCount: number = await context.database.cities.countDocuments()
  return citiesCount
}
