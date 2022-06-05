import { Context } from '../../../../types/context'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const faqsCount: number = await context.database.faqs.countDocuments()
  return faqsCount
}
