import { Context } from '../../../../types/setup/context'
import { City, GetCityArgs } from '../../../../types/city'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser(context, true)

  const city: City = await returnData(context, args, 'cities')
  return city
}
