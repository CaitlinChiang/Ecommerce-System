import { ObjectId } from 'mongodb'
import { CartItem } from '../../../types/cart'

export const returnProductIds = (itemsArray: CartItem[]) => {
  const productIds: ObjectId[] = itemsArray
    // eslint-disable-next-line no-prototype-builtins
    .filter((item: CartItem) => item.hasOwnProperty('productId'))
    .map((item: CartItem) => item.productId)

  return productIds
}

export const returnProductVariantIds = (itemsArray: CartItem[]) => {
  const productVariantIds: ObjectId[] = itemsArray
    // eslint-disable-next-line no-prototype-builtins
    .filter((item: CartItem) => item.hasOwnProperty('productVariantId'))
    .map((item: CartItem) => item.productId)

  return productVariantIds
}
