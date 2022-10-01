import { Context } from '../../../types/setup/context'
import { queryArgs } from '../handleArgs/queryArgs'

export const returnDataCount = async (
  context: Context,
  args: any,
  dbName: string
): Promise<number> => {
  const count: any = await context.database[dbName].countDocuments(queryArgs(args))

  return count
}
