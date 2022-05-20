import { ObjectId } from 'mongodb'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Cart {
  _id?: ObjectId
  _userId?: ObjectId
  products?: CartProduct[]
  productVariants?: CartProductVariant[]
  quantity?: number
  totalPrice?: number
}

export interface CartProduct {
  product?: Product
  quantity?: number
  totalPrice?: number
}
export interface CartProductVariant {
  productVariant?: ProductVariant
  quantity?: number
  totalPrice?: number
}

export interface GetCartArgs {
  _userId: ObjectId
}

export interface AddToCartArgs {
  _userId: ObjectId
  product?: CartProduct
  productVariant?: CartProductVariant
}

export interface RemoveFromCartArgs {
  _userId: ObjectId
  productId?: ObjectId
  productVariantId?: ObjectId
}
