import { Context } from 'types/context'
import { Product, CreateProductArgs } from 'types/product'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'

export default async (_root: undefined, args: CreateProductArgs, context: Context): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  }
  const imageUrl = await handleUploadImage(uploadImage)

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
