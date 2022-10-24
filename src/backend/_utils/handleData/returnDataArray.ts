import { Context } from '../../../types/setup/context'
import { queryArgs } from '../handleArgs/queryArgs'
import { sort, skip, limit } from '../handleArgs/paginateArgs'

export const returnDataArray = async (
  context: Context,
  args: any,
  dbName: string
): Promise<any[]> => {
  const data: any[] = await context.database[dbName]
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .collation({ locale: 'en', caseLevel: true })
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return data
}
