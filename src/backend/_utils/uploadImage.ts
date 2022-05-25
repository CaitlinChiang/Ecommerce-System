const cloudinary = require('./cloudinarySetup')

type ImageUploadArgs = {
  imageType?: string
  image?: File
  productName?: string
  productId?: string
  productVariantName?: string
}

export const uploadImage = async (args: ImageUploadArgs) => {
  const fileName = assignFileName(args)
  
  await cloudinary.uploader.upload(args.image, { public_id: fileName })

  return fileName
}

const assignFileName = (args: ImageUploadArgs) => {
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
