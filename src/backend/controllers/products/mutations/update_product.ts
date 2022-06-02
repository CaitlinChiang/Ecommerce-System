import { Context } from 'types/context'
import { Product, UpdateProductArgs } from 'types/product'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'
import { handleDeleteImage } from 'backend/_utils/handleImages/deleteImage'

export default async (_root: undefined, args: UpdateProductArgs, context: Context): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  const { _id, category, description, featured, image, imageUrl, name, price, showPublic } = args

  await handleDeleteImage(imageUrl)
  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT,
    image,
    productName: name
  }
  const modifiedImageUrl = await handleUploadImage(uploadImage)

  const product: any = await context.database.products.findOneAndUpdate(
    { _id: _id },
    {
      category,
      description,
      featured,
      imageUrl: modifiedImageUrl,
      name,
      price,
      showPublic,
      updatedAt: new Date()
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT,
    productId: product._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return product
}
