type ImageUploadArgs {
  imageType?: string
  productName?: string
  productId?: string
  productVariantName?: string
}

export const uploadImage = async (args: ImageUploadArgs) => {
  const fileName = assignFileName(args)
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
  return productName.replaceAll(' ', '-').toLowerCase()
}

const generateProductVariantImageFileName = (productId, productVariantName) => {
  let modifiedProductId = productId.substr(productId.length - 5)
  let modifiedProductVariantName = productVariantName.replaceAll(' ', '-').toLowerCase()

  return modifiedProductId.concat('/', modifiedProductVariantName)
}
