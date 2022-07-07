import { Context } from '../../../../types/setup/context'
import { City, CreateCityArgs } from '../../../../types/city'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true }, context)

  const city: any = await context.database.cities.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_CITY,
    cityId: city.insertedId,
    ...auditArgs(context)
  })

  return city
}
