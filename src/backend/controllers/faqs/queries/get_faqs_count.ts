import { Context } from '../../../../types/setup/context'
import { GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const faqsCount: any = await context.database.faqs.countDocuments(queryArgs(args))

  return faqsCount
}
