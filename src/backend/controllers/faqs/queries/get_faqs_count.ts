import { Context } from '../../../../types/setup/context'
import { GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const count: any = await context.database.faqs.countDocuments(queryArgs(args))

  return count
}
