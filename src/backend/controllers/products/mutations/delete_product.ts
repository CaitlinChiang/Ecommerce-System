import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, DeleteProductArgs } from '../../../../types/product'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import {
  deleteImage,
  deleteProductVariantImages
} from '../../../_utils/handleImages/delete'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  await deleteImage(args.imageUrl)

  const product: any = await context.database.products.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT,
    productId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  await deleteProductVariantImages(args._id, context)

  await context.database.productVariants.deleteMany({
    _productId: new ObjectId(args._id)
  })

  return product
}
