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
  if (!imageUrl || (!image && shouldExist)) return

  destroyImageUrl(imageUrl)
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
      destroyImageUrl(productVariant.imageUrl)
    }
  })
}

const destroyImageUrl = async (url: string): Promise<void> => {
  await cloudinary.uploader.destroy(url)
}
