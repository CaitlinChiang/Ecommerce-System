import { Context } from '../../../../types/setup/context'
import { FAQ, GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ[]> => {
  await authenticateUser(context, false)

  const faqs: FAQ[] = await returnDataArray(context, args, 'faqs')
  return faqs
}
