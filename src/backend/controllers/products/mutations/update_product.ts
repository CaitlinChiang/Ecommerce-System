import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, UpdateProductArgs } from '../../../../types/product'
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
  args: UpdateProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: true }, context)

  const { image, ...modifiedArgs } = args

  await deleteImage(image, args.imageUrl, MutateAction.UPDATE)

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  const product: any = await context.database.products.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    {
      $set: {
        ...mutationArgs(modifiedArgs, MutateAction.UPDATE),
        imageUrl: modifiedImageUrl
      }
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT,
    productId: new ObjectId(product._id),
    ...auditArgs(context)
  })

  return product
}
