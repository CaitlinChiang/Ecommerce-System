import { Context } from 'types/context'
import { ProductVariant, UpdateProductVariantArgs } from 'types/productVariant'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'
import { handleDeleteImage } from 'backend/_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const { _id, _productId, image, imageUrl, name, price, showPublic } = args

  await handleDeleteImage(imageUrl)
  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT_VARIANT,
    image: image,
    productId: String(_productId),
    productVariantName: name
  }
  const modifiedImageUrl = await handleUploadImage(uploadImage)

  const updateProductVariant: Partial<UpdateProductVariantArgs> = {
    imageUrl: modifiedImageUrl,
    name: name,
    price: price,
    showPublic: showPublic,
    updatedAt: new Date()
  }
  const productVariant: any = await context.database.productVariants.findOneAndUpdate({ _id: _id }, updateProductVariant)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
