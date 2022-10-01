import { Context } from '../../../../types/setup/context'
import { FAQ, GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser(context, true)

  const faq: FAQ = await returnData(context, args, 'faqs')
  return faq
}
