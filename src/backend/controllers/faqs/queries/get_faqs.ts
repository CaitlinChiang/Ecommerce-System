import { Context } from '../../../../types/setup/context'
import { FAQ, GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ[]> => {
  await authenticateUser(context, false)

  const faqs: FAQ[] = await returnDataCount(context, args, 'faqs')
  return faqs
}
