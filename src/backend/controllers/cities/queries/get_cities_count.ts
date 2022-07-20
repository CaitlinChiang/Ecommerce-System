import { Context } from '../../../../types/setup/context'
import { GetCityArgs } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true, context })

  const citiesCount: any = await context.database.cities.countDocuments(
    queryArgs(args)
  )

  return citiesCount
}
