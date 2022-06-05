import { Context } from '../../../../types/context'
import { Product, CreateProductArgs } from '../../../../types/product'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleUploadImage } from '../../../_utils/handleImages/uploadImage'

export default async (
  _root: undefined,
  args: CreateProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  const imageUrl = await handleUploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  const product: any = await context.database.products.insertOne({
    ...modifiedArgs,
    imageUrl,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT,
    productId: product._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return product
}
