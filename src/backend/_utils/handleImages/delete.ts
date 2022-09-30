import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'

const cloudinary = require('../setup/cloudinary')

export const deleteImage = async ({
  image,
  imageUrl,
  shouldExist
}: {
  image?: Promise<FileUpload>
  imageUrl: string
  shouldExist?: boolean
}): Promise<void> => {
  if (!image && shouldExist) return
  await destroyImageUrl(imageUrl)
}

export const deleteProductVariantImages = async (
  context: Context,
  productId: ObjectId
): Promise<void> => {
  if (!productId) return

  const productVariants: ProductVariant[] = await context.database.productVariants
    .find({ _productId: new ObjectId(productId) })
    .toArray()

  for (let i = 0, n = productVariants.length; i < n; i++) {
    await destroyImageUrl(productVariants[i].imageUrl)
  }
}

const destroyImageUrl = async (url: string): Promise<void> => {
  if (!url) return
  await cloudinary.uploader.destroy(url)
}
