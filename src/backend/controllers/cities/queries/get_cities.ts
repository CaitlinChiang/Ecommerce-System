import { Context } from '../../../../types/setup/context'
import { City, GetCityArgs } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City[]> => {
  await authenticateUser({ admin: false, context })

  const cities: City[] = await context.database.cities
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return cities
}
