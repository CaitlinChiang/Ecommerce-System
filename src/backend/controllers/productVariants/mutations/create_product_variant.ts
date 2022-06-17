import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  CreateProductVariantArgs
} from '../../../../types/productVariant'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'

export default async (
  _root: undefined,
  args: CreateProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  const imageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT_VARIANT,
    image,
    productId: String(args._productId),
    productVariantName: args.name
  })

  const productVariant: any = await context.database.productVariants.insertOne({
    ...mutationArgs(modifiedArgs, MutateAction.CREATE),
    imageUrl
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT_VARIANT,
    productVariantId: productVariant._id,
    ...auditArgs(context)
  })

  return productVariant
}
