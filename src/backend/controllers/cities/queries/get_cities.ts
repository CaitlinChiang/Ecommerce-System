import { Context } from '../../../../types/setup/context'
import { City } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<City[]> => {
  authenticateUser({ admin: false }, context)

  const cities: any = await context.database.cities.find(queryArgs(args))
  return cities
}
