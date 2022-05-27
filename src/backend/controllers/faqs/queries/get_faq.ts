import { Context } from 'types/context'
import { FAQ, GetFAQArgs } from 'types/faq'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ> => {
  const { _id } = args

  const faq: FAQ = await context.database.faqs.findOne({ _id: _id })

  return faq
}
