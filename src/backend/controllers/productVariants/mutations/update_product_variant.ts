import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  UpdateProductVariantArgs
} from '../../../../types/productVariant'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { deleteImage } from '../../../_utils/handleImages/delete'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  await deleteImage(args.imageUrl)

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariant: any =
    await context.database.productVariants.findOneAndUpdate(
      { _id: args._id },
      {
        ...mutationArgs(modifiedArgs, MutateAction.UPDATE),
        imageUrl: modifiedImageUrl
      }
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    ...auditArgs(context)
  })

  return productVariant
}
