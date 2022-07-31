import { Context } from '../../../../types/setup/context'
import { Product, CreateProductArgs } from '../../../../types/product'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UploadImageType } from '../../../_enums/uploadImageType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { uploadImage } from '../../../_utils/handleImages/upload'

export default async (
  _root: undefined,
  args: CreateProductArgs,
  context: Context
): Promise<Product> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_PRODUCT,
    context
  })

  const { image, ...modifiedArgs } = args

  const imageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  const product: any = await context.database.products.insertOne({
    ...mutateArgs(modifiedArgs, MutateAction.CREATE),
    imageUrl
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PRODUCT,
    productId: product.insertedId,
    ...auditArgs(context)
  })

  return product.insertedId
}
