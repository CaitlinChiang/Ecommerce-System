import { Context } from 'types/context'
import { City } from 'types/City'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<City[]> => {
  authenticateUser({ admin: false }, context)

  const cities: any = await context.database.cities.find({})
  return cities
}
