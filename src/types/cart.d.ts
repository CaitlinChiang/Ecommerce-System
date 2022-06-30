import { ObjectId } from 'mongodb'
import { Product } from './product'
import { ProductVariant } from './productVariant'

export interface Cart {
  _id?: ObjectId
  _userId?: ObjectId
  items?: CartItem[]
  quantity?: number
  totalPrice?: number
}

export interface CartItem {
  product?: Product
  productId?: ObjectId
  productVariant?: ProductVariant
  productVariantId?: ObjectId
  quantity?: number
  totalPrice?: number
}

export interface AddToCartArgs {
  productId: ObjectId
  productVariantId?: ObjectId
  quantity: number
  totalPrice: number
}

export interface RemoveFromCartArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
}
