import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  CreateProductVariantArgs
} from '../../../../types/productVariant'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_PRODUCT_VARIANT,
    context
  })

  const { image, ...modifiedArgs } = args

  const imageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariantId: ObjectId = await context.database.productVariants
    .insertOne({
      ...mutateArgs(modifiedArgs, MutateAction.CREATE),
      imageUrl
    })
    .then((productVariant) => productVariant.insertedId)

  await createAuditLog(AuditLogAction.CREATE_PRODUCT_VARIANT, context)

  return { _id: productVariantId, ...args }
}
