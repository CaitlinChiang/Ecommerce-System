import { Context } from 'types/context'
import { FAQ } from 'types/faq'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<FAQ[]> => {
  const faqs: any = await context.database.faqs.find({})
  
  return faqs
}
