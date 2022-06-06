import { UploadImageArgs } from '../../../types/image'
import { ImageType } from '../../../types/_enums/imageType'

const cloudinary = require('../setup/cloudinary')

export const handleUploadImage = async (args: UploadImageArgs): Promise<string> => {
  const fileName = assignFileName(args)
  await cloudinary.uploader.upload(args.image, { public_id: fileName })

  return fileName
}

const assignFileName = (args: UploadImageArgs) => {
  switch (args.imageType) {
    case ImageType.PAYMENT:
      return generatePaymentImageFileName(args.paymentId)
    case ImageType.PRODUCT:
      return generateProductImageFileName(args.productName)
    case ImageType.PRODUCT_VARIANT:
      return generateProductVariantImageFileName(
        args.productId,
        args.productVariantName
      )
  }
}

const generatePaymentImageFileName = (paymentId: string) => {
  const folderName = 'payments/'
  const modifiedPaymentId = paymentId.substr(paymentId.length - 5)

  return folderName.concat(modifiedPaymentId)
}

const generateProductImageFileName = (productName: string) => {
  const folderName = 'products/'
  const modifiedProductName = productName.replaceAll(' ', '_').toLowerCase()

  return folderName.concat(modifiedProductName)
}

const generateProductVariantImageFileName = (
  productId: string,
  productVariantName: string
) => {
  const folderName = 'product-variants/'
  const modifiedProductId = productId.substr(productId.length - 5)
  const modifiedProductVariantName = productVariantName
    .replaceAll(' ', '_')
    .toLowerCase()

  return folderName.concat(modifiedProductId, '_', modifiedProductVariantName)
}
