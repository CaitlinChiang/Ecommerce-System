import { ObjectId } from 'mongodb'
import { Context } from '../../../types/context'
import { CartProduct, CartProductVariant, GetCartArgs } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export default {
  Cart: {
    products: async (args: GetCartArgs, context: Context): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: {
          $in: args?.products?.map(
            (product: CartProduct): ObjectId => new ObjectId(product?.productId)
          )
        }
      })
      return products
    },

    productVariants: async (
      args: GetCartArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: {
          $in: args?.productVariants?.map(
            (productVariant: CartProductVariant): ObjectId =>
              new ObjectId(productVariant?.productVariantId)
          )
        }
      })
      return productVariants
    },

    quantity: async (args: GetCartArgs): Promise<number> => {
      const productsQuantity: number = args?.products?.length

      const productVariantsQuantity: number = args?.productVariants?.length

      return productsQuantity + productVariantsQuantity
    },

    totalPrice: async (args: GetCartArgs): Promise<number> => {
      const productsPrice: number = args?.products?.reduce(
        (totalPrice: number, currentProduct: CartProduct): number => {
          return totalPrice + currentProduct?.totalPrice
        },
        0
      )

      const productVariantsPrice: number = args?.productVariants?.reduce(
        (totalPrice: number, currentProductVariant: CartProductVariant): number => {
          return totalPrice + currentProductVariant?.totalPrice
        },
        0
      )

      return productsPrice + productVariantsPrice
    }
  }
}
