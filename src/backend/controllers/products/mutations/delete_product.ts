import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { DeleteProductArgs } from '../../../../types/product'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import {
  deleteImage,
  deleteProductVariantImages
} from '../../../_utils/handleImages/delete'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_PRODUCT)

  await deleteImage({ imageUrl: args?.imageUrl })

  await deleteData(context, args, 'products')

  await createAuditLog(context, AuditLogAction.DELETE_PRODUCT)

  await deleteProductVariantImages(context, args._id)

  await context.database.productVariants.deleteMany({
    _productId: new ObjectId(args._id)
  })
}
