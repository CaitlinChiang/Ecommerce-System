import { Context } from 'types/context'
import { City, GetCityArgs } from 'types/city'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City> => {
  const { _id } = args

  const city: City = await context.database.cities.findOne({ _id: _id })

  return city
}
