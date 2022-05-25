import { Context } from 'types/context'
import { ProductVariant, CreateProductVariantArgs } from 'types/productVariant'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'

export default async (
  _root: undefined,
  args: CreateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const { _productId, image, name, price } = args

  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT_VARIANT,
    image: image,
    productId: String(_productId),
    productVariantName: name
  }
  const imageUrl = await handleUploadImage(uploadImage)

  const createProductVariant: CreateProductVariantArgs = {
    _productId: _productId,
    imageUrl: imageUrl,
    name: name,
    price: price,
    createdAt: new Date()
  }
  const productVariant: any = await context.database.productVariants.insertOne(createProductVariant)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
