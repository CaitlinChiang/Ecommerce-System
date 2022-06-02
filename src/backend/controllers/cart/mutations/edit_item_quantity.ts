import { Context } from 'types/context'
import { Cart, AddToCartArgs } from 'types/cart'

export default async (
  _root: undefined,
  args: AddToCartArgs,
  context: Context
): Promise<Cart> => {
  const { product, productVariant } = args

  const cart: any = await context.database.carts.findOneAndUpdate(
    { 
      _userId: context.currentUserId,
      products: { 
        $elemMatch: { _id: product.productId, }
      },
      productVariants: { 
        $elemMatch: { _id: productVariant.productVariantId, }
      },
    }, 
    {
      $set: {
        'products.$.quantity': product.quantity,
        'productVariants.$.quantity': productVariant.quantity
      }
    }
  )
  return cart
}
