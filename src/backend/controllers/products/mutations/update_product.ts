import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, UpdateProductArgs } from '../../../../types/product'
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
  args: UpdateProductArgs,
  context: Context
): Promise<Product> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_PRODUCT)

  const { image, ...modifiedArgs } = args

  await deleteImage({ image, imageUrl: args?.imageUrl, shouldExist: true })

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  const product: Product = await context.database.products
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      {
        $set: {
          ...mutateArgs(context, modifiedArgs, MutateAction.UPDATE),
          imageUrl: modifiedImageUrl || args.imageUrl
        }
      },
      { returnDocument: 'after' }
    )
    .then((product) => product.value)

  await createAuditLog(context, AuditLogAction.DELETE_PRODUCT)

  return product
}
