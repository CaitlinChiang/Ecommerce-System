import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, GetCityArgs } from '../../../../types/city'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true }, context)

  const city: City = await context.database.cities.findOne({
    _id: new ObjectId(args._id)
  })

  return city
}
