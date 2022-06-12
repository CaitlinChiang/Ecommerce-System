import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  UpdateProductVariantArgs
} from '../../../../types/productVariant'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleUploadImage } from '../../../_utils/handleImages/uploadImage'
import { handleDeleteImage } from '../../../_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  await handleDeleteImage(args.imageUrl)
  const modifiedImageUrl = await handleUploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariant: any =
    await context.database.productVariants.findOneAndUpdate(
      { _id: args._id },
      {
        ...modifiedArgs,
        imageUrl: modifiedImageUrl,
        updatedAt: new Date()
      }
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return productVariant
}
