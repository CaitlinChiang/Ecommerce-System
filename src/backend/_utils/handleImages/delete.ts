const cloudinary = require('../setup/cloudinary')

import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'

export const deleteImage = async ({
  image,
  imageUrl,
  shouldExist
}: {
  image?: Promise<FileUpload>
  imageUrl: string
  shouldExist?: boolean
}): Promise<void> => {
  if (!imageUrl || (!image && shouldExist)) return

  await cloudinary.uploader.destroy(imageUrl)
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
      await cloudinary.uploader.destroy(productVariant.imageUrl)
    }
  })
}
