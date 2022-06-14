import { Context } from '../../../../types/setup/context'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const citiesCount: any = await context.database.cities.countDocuments(
    queryArgs(args)
  )
  return citiesCount
}
