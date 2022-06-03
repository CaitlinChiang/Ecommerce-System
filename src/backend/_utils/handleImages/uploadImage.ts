import { UploadImageArgs } from 'types/image'
const cloudinary = require('../setup/cloudinary')

export const handleUploadImage = async (args: UploadImageArgs) => {
  const fileName = assignFileName(args)
  await cloudinary.uploader.upload(args.image, { public_id: fileName })

  return fileName
}

const assignFileName = (args: UploadImageArgs) => {
  switch (args.imageType) {
    case 'PRODUCT':
      return generateProductImageFileName(args.productName)
    case 'PRODUCT_VARIANT':
      return generateProductVariantImageFileName(
        args.productId,
        args.productVariantName
      )
  }
}

const generateProductImageFileName = (productName) => {
  const folderName = 'products/'
  const modifiedProductName = productName.replaceAll(' ', '_').toLowerCase()

  return folderName.concat(modifiedProductName)
}

const generateProductVariantImageFileName = (productId, productVariantName) => {
  const folderName = 'product-variants/'
  const modifiedProductId = productId.substr(productId.length - 5)
  const modifiedProductVariantName = productVariantName
    .replaceAll(' ', '_')
    .toLowerCase()

  return folderName.concat(modifiedProductId, '_', modifiedProductVariantName)
}
