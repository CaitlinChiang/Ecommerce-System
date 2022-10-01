import { Context } from '../../../../types/setup/context'
import { City, GetCityArgs } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City[]> => {
  await authenticateUser(context, false)

  const cities: City[] = await returnDataArray(context, args, 'cities')
  return cities
}
