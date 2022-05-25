import { Context } from 'types/context'
import { Product, UpdateProductArgs } from 'types/product'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'
import { handleDeleteImage } from 'backend/_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: UpdateProductArgs,
  context: Context
): Promise<Product> => {
  const { _id, image, imageUrl, name, price, type } = args

  await handleDeleteImage(imageUrl)
  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT,
    image: image,
    productName: name
  }
  const modifiedImageUrl = await handleUploadImage(uploadImage)
  
  const updateProduct: Partial<UpdateProductArgs> = {
    imageUrl: modifiedImageUrl,
    name: name,
    price: price,
    type: type,
    updatedAt: new Date()
  }
  const product: any = await context.database.products.findOneAndUpdate({ _id: _id }, updateProduct)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT,
    productId: product._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return product
}
