import { Context } from 'types/context'
import { FAQ } from 'types/faq'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: undefined, context: Context): Promise<FAQ[]> => {
  authenticateUser({ admin: false }, context)

  const faqs: any = await context.database.faqs.find({})
  return faqs
}
