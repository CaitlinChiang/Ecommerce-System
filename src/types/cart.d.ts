import { ObjectId } from 'mongodb'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Cart {
  _id?: ObjectId
  _userId?: ObjectId
  products?: CartProductArgs[]
  productVariants?: CartProductVariantArgs[]
}

export interface CartProductArgs {
  product?: Product
  quantity?: number
}
export interface CartProductVariantArgs {
  productVariant?: ProductVariant
  quantity?: number
}

export interface GetCartArgs {
  _userId: ObjectId
}

export interface AddToCartArgs {
  products?: CartProductArgs[]
  productVariants?: CartProductVariantArgs[]
}

export interface RemoveFromCartArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
}
