import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const faqsCount: number = await context.database.faqs.countDocuments()
  
  return faqsCount
}
