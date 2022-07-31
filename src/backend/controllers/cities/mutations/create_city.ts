import { Context } from '../../../../types/setup/context'
import { City, CreateCityArgs } from '../../../../types/city'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_CITY,
    context
  })

  const city: any = await context.database.cities.insertOne(
    mutateArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_CITY,
    cityId: city.insertedId,
    ...auditArgs(context)
  })

  return city.insertedId
}
