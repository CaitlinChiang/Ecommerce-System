import { Context } from 'types/context'
import { City } from 'types/City'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<City[]> => {
  const cities: any = await context.database.cities.find({})
  
  return cities
}