import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  UpdateProductVariantArgs
} from '../../../../types/productVariant'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { deleteImage } from '../../../_utils/handleImages/delete'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  await deleteImage({ image, imageUrl: args?.imageUrl, shouldExist: true })

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariant: any =
    await context.database.productVariants.findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      {
        $set: {
          ...mutationArgs(modifiedArgs, MutateAction.UPDATE),
          imageUrl: modifiedImageUrl
        }
      }
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_VARIANT,
    productVariantId: new ObjectId(productVariant._id),
    ...auditArgs(context)
  })

  return productVariant
}
