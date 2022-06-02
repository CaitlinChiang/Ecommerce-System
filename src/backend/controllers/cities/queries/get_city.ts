import { Context } from 'types/context'
import { City, GetCityArgs } from 'types/city'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: GetCityArgs, context: Context): Promise<City> => {
  authenticateUser({ admin: true }, context)

  const city: City = await context.database.cities.findOne({ _id: args._id })
  return city
}
