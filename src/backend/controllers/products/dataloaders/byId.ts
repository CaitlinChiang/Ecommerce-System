import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Product } from '../../../../types/product'

export default async (db: Database, ids: ObjectId[]): Promise<Product[]> => {
  const products: Product[] = await db.products.find({ _id: { $in: ids } }).toArray()

  const productsById: { [id: string]: Product } = {}

  products.forEach((product: Product): void => {
    productsById[String(product._id)] = product
  })

  return ids.map((id: ObjectId): Product => productsById[String(id)])
}
