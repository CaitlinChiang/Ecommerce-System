import { groupBy } from 'lodash'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'

export default async (
  db: Database,
  ids: ObjectId[][]
): Promise<ProductVariant[][]> => {
  const modifiedProductVariants = []

  ids.map(async (idsArray: ObjectId[], index: number): Promise<void> => {
    const productVariants = await db.productVariants
      .find({ _id: { $in: idsArray } })
      .toArray()

    productVariants.map((productVariant: ProductVariant) =>
      modifiedProductVariants.push({ ...productVariant, groupId: String(index) })
    )
  })

  const modifiedProductVariantsByGroupId = groupBy(
    modifiedProductVariants,
    'groupId'
  )

  return ids.map(
    (idsArray: ObjectId[], index: number): ProductVariant[] =>
      modifiedProductVariantsByGroupId[String(index)]
  )
}
