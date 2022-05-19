import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const usersCount: number = await context.database.users.countDocuments()
  return usersCount
}
