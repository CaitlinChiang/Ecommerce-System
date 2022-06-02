import { Context } from 'types/context'
import { Product, CreateProductArgs } from 'types/product'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'

export default async (_root: undefined, args: CreateProductArgs, context: Context): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  const { category, description, featured, image, name, price, showPublic } = args

  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT,
    image,
    productName: name
  }
  const imageUrl = await handleUploadImage(uploadImage)

  const product: any = await context.database.products.insertOne({
    category,
    description,
    featured,
    imageUrl,
    name,
    price,
    showPublic,
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
