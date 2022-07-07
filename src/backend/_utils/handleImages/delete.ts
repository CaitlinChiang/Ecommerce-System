const cloudinary = require('../setup/cloudinary')
import { FileUpload } from 'graphql-upload'
import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'
import { MutateAction } from '../../_enums/mutateAction'

export const deleteImage = async (
  image: Promise<FileUpload>,
  imageUrl: string,
  mutation: MutateAction
): Promise<void> => {
  if (!imageUrl || (!image && mutation === MutateAction.UPDATE)) return

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
