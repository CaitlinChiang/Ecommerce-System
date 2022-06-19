import { groupBy } from 'lodash'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Product } from '../../../../types/product'

export default async (db: Database, ids: ObjectId[][]): Promise<Product[][]> => {
  const modifiedProducts = []

  ids.map(async (idsArray: ObjectId[], index: number): Promise<void> => {
    const products = await db.products.find({ _id: { $in: idsArray } }).toArray()
    products.map((product: Product) =>
      modifiedProducts.push({ ...product, groupId: String(index) })
    )
  })

  const modifiedProductsByGroupId = groupBy(modifiedProducts, 'groupId')

  return ids.map(
    (idsArray: ObjectId[], index: number): Product[] =>
      modifiedProductsByGroupId[String(index)]
  )
}
