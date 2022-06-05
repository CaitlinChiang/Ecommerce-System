import { ObjectId } from 'mongodb'
import { Product } from './product'
import { ProductVariant } from './productVariant'

export interface Cart {
  _id?: ObjectId
  _userId?: ObjectId
  items?: CartItem[]
  products?: Product[]
  productVariants?: ProductVariant[]
  quantity?: number
  totalPrice?: number
}

export interface CartItem {
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
  totalPrice: number
}

export interface GetCartArgs {
  products?: CartProduct[]
  productVariants?: CartProductVariant[]
}

export interface AddToCartArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
  totalPrice: number
}

export interface RemoveFromCartArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
}
