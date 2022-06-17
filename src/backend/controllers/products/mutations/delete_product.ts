import { Context } from '../../../../types/setup/context'
import { Product, DeleteProductArgs } from '../../../../types/product'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  await deleteImage(args.imageUrl)

  const product: any = await context.database.products.findOneAndDelete({
    _id: args._id
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT,
    productId: args._id,
    ...auditArgs(context)
  })

  return product
}
