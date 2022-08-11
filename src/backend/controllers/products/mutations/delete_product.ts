import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, DeleteProductArgs } from '../../../../types/product'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import {
  deleteImage,
  deleteProductVariantImages
} from '../../../_utils/handleImages/delete'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<Product> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PRODUCT,
    context
  })

  await deleteImage({ imageUrl: args?.imageUrl })

  const product: Product = await context.database.products
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((product) => product.value)

  await createAuditLog(AuditLogAction.DELETE_PRODUCT, context)

  await deleteProductVariantImages(args._id, context)

  await context.database.productVariants.deleteMany({
    _productId: new ObjectId(args._id)
  })

  return product
}
