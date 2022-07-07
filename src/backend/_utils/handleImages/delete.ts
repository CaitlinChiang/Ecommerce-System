const cloudinary = require('../setup/cloudinary')
import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'

export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!imageUrl) return

  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}

export const deleteProductVariantImages = async (
  productId: ObjectId,
  context: Context
): Promise<void> => {
  if (!productId) return

  const productVariants: ProductVariant[] = await context.database.productVariants
    .find({ _productId: new ObjectId(productId) })
    .toArray()

  productVariants.forEach(async (productVariant: ProductVariant) => {
    if (productVariant?.imageUrl) {
      await cloudinary.uploader.destroy(productVariant?.imageUrl, (res) =>
        console.log(res)
      )
    }
  })
}
