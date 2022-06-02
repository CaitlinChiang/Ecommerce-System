import { Context } from 'types/context'
import { ProductVariant, CreateProductVariantArgs } from 'types/productVariant'
import { UploadImageArgs } from 'types/image'
import { UploadImageType } from 'types/_enums/uploadImageType'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'
import { handleUploadImage } from 'backend/_utils/handleImages/uploadImage'

export default async (
  _root: undefined,
  args: CreateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  const { _productId, image, name, price, showPublic } = args

  const uploadImage: UploadImageArgs = {
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(_productId),
    productVariantName: name
  }
  const imageUrl = await handleUploadImage(uploadImage)

  const productVariant: any = await context.database.productVariants.insertOne({
    _productId,
    imageUrl,
    name,
    price,
    showPublic,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
