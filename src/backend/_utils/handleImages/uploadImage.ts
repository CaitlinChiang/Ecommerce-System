import { UploadImageArgs } from 'types/image'

const cloudinary = require('./cloudinarySetup')

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
      return generateProductVariantImageFileName(args.productId, args.productVariantName)
  }
}

const generateProductImageFileName = (productName) => {
  let folderName = 'products/'
  let modifiedProductName = productName.replaceAll(' ', '_').toLowerCase()

  return folderName.concat(modifiedProductName)
}

const generateProductVariantImageFileName = (productId, productVariantName) => {
  let folderName = 'product-variants/'
  let modifiedProductId = productId.substr(productId.length - 5)
  let modifiedProductVariantName = productVariantName.replaceAll(' ', '_').toLowerCase()

  return folderName.concat(modifiedProductId, '_', modifiedProductVariantName)
}
