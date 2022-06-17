import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  UpdateProductCategoryArgs
} from '../../../../types/productCategory'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  const productCategory: any =
    await context.database.productCategories.findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      mutationArgs(args, MutateAction.UPDATE)
    )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PRODUCT_CATEGORY,
    productCategoryId: new ObjectId(productCategory._id),
    ...auditArgs(context)
  })

  return productCategory
}
