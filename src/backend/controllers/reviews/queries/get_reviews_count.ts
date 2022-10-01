import { Context } from '../../../../types/setup/context'
import { GetReviewArgs } from 'types/review'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const count: number = await returnDataCount(context, args, 'reviews')
  return count
}
