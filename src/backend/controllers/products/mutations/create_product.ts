import { Context } from '../../../../types/setup/context'
import { CreateProductArgs } from '../../../../types/product'
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
  args: CreateProductArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.CREATE_PRODUCT)

  const { image, ...modifiedArgs } = args

  const imageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  await context.database.products.insertOne({
    ...mutateArgs(context, modifiedArgs, MutateAction.CREATE),
    imageUrl
  })

  await createAuditLog(context, AuditLogAction.CREATE_PRODUCT)
}
