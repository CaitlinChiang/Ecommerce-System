import { Context } from '../../../../types/setup/context'
import { Product, UpdateProductArgs } from '../../../../types/product'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { MutateAction } from '../../../../types/_enums/mutateAction'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
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

  await deleteImage(args.imageUrl)

  const modifiedImageUrl = await uploadImage({
    imageType: UploadImageType.PRODUCT,
    image,
    productName: args.name
  })

  const product: any = await context.database.products.findOneAndUpdate(
    { _id: args._id },
    {
      ...mutationArgs(modifiedArgs, MutateAction.UPDATE),
      imageUrl: modifiedImageUrl
    }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT,
    productId: product._id,
    ...auditArgs(context)
  })

  return product
}
