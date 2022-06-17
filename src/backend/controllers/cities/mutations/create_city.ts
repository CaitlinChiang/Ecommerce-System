import { Context } from '../../../../types/setup/context'
import { City, CreateCityArgs } from '../../../../types/city'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

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
    cityId: city._id,
    ...auditArgs(context)
  })

  return city
}
