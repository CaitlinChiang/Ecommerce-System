import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, CreateProductArgs } from '../../../../types/product'
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

  const productId: ObjectId = await context.database.products
    .insertOne({
      ...mutateArgs(modifiedArgs, MutateAction.CREATE),
      imageUrl
    })
    .then((product) => product.insertedId)

  await createAuditLog(AuditLogAction.CREATE_PRODUCT, context)

  return { _id: productId, ...args }
}
