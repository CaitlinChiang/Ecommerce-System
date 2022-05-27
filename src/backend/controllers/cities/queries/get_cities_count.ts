import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const citiesCount: number = await context.database.cities.countDocuments()
  
  return citiesCount
}
