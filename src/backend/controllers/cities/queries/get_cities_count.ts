import { Context } from '../../../../types/setup/context'
import { GetCityArgs } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const count: number = await returnDataCount(context, args, 'cities')
  return count
}
