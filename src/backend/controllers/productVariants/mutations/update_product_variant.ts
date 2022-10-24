import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  UpdateProductVariantArgs
} from '../../../../types/productVariant'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { deleteImage } from '../../../_utils/handleImages/delete'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_PRODUCT_VARIANT)

  const { image, ...modifiedArgs } = args

  await deleteImage({ image, imageUrl: args?.imageUrl, shouldExist: true })

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariant: ProductVariant = await context.database.productVariants
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      {
        $set: {
          ...mutateArgs(context, modifiedArgs, MutateAction.UPDATE),
          imageUrl: modifiedImageUrl
        }
      },
      { returnDocument: 'after' }
    )
    .then((productVariant) => productVariant.value)

  await createAuditLog(context, AuditLogAction.UPDATE_PRODUCT_VARIANT)

  return productVariant
}
