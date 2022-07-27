import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser({ admin: true, context })

  const faq: FAQ = await context.database.faqs.findOne({
    _id: new ObjectId(args._id)
  })

  return faq
}
