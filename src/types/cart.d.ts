import { ObjectId } from 'mongodb'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Cart {
  _id?: ObjectId
  products?: CartProduct[]
  productVariants?: CartProductVariant[]
  quantity?: number
  totalPrice?: number
}

export interface CartProduct {
  productId?: ObjectId
  product?: Product
  quantity?: number
  totalPrice?: number
}
export interface CartProductVariant {
  productVariantId?: ObjectId
  productVariant?: ProductVariant
  quantity?: number
  totalPrice?: number
}

export interface GetCartArgs {
  products?: CartProduct[]
  productVariants?: CartProductVariant[]
}

export interface AddToCartArgs {
  product?: CartProduct
  productVariant?: CartProductVariant
}

export interface RemoveFromCartArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
}
