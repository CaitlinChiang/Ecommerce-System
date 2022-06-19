import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductCategory } from '../../../../types/productCategory'

export default async (db: Database, ids: ObjectId[]): Promise<ProductCategory[]> => {
  const productCategories: ProductCategory[] = await db.productCategories
    .find({ _id: { $in: ids } })
    .toArray()

  const productCategoriesById: { [id: string]: ProductCategory } = {}

  productCategories.forEach((productCategory: ProductCategory): void => {
    productCategoriesById[String(productCategory._id)] = productCategory
  })

  return ids.map(
    (id: ObjectId): ProductCategory => productCategoriesById[String(id)]
  )
}
