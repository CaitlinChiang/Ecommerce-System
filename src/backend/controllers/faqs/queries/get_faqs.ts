import { Context } from '../../../../types/setup/context'
import { FAQ, GetFAQArgs } from '../../../../types/faq'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetFAQArgs,
  context: Context
): Promise<FAQ[]> => {
  authenticateUser({ admin: false }, context)

  const faqs: FAQ[] = await context.database.faqs
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return faqs
}
