import { Context } from 'types/context'
import { Product, DeleteProductArgs } from 'types/product'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'
import { handleDeleteImage } from 'backend/_utils/handleImages/deleteImage'

export default async (_root: undefined, args: DeleteProductArgs, context: Context): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  await handleDeleteImage(args.imageUrl)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PRODUCT,
    productId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const product: any = await context.database.products.findOneAndDelete({ _id: args._id })
  return product
}
