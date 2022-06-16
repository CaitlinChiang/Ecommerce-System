import { Context } from '../../../../types/setup/context'
import { City, GetCityArgs } from '../../../../types/City'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetCityArgs,
  context: Context
): Promise<City[]> => {
  authenticateUser({ admin: false }, context)

  const cities: any = await context.database.cities
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset)
    .limit(args?.paginateData?.rowsPerPage)

  return cities
}
