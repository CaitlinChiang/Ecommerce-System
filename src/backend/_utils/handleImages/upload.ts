import { UploadImageArgs } from '../../../types/actions/uploadImage'
import { UploadImageType } from '../../_enums/uploadImageType'

const cloudinary = require('../setup/cloudinary')

export const uploadImage = async (args: UploadImageArgs): Promise<string> => {
  if (!args.image) return

  const { createReadStream } = await args.image
  const fileName = assignFileName(args)

  return await uploadToCloudinary(createReadStream, fileName)
}

const assignFileName = (args: UploadImageArgs) => {
  const { imageType, orderId, productId, productName, productVariantName } = args

  switch (imageType) {
    case UploadImageType.PAYMENT:
      return generatePaymentImageFileName(orderId)
    case UploadImageType.PRODUCT:
      return generateProductImageFileName(productName)
    case UploadImageType.PRODUCT_VARIANT:
      return generateProductVariantImageFileName(productId, productVariantName)
  }
}

const generatePaymentImageFileName = (orderId: string) => {
  const folderName = 'payments/'
  const modifiedPaymentId = orderId.substring(orderId.length - 5)

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
  const modifiedProductId = productId.substring(productId.length - 5)
  const modifiedProductVariantName = productVariantName
    .replaceAll(' ', '_')
    .toLowerCase()

  return folderName.concat(modifiedProductId, '_', modifiedProductVariantName)
}

const uploadToCloudinary = async (createReadStream, fileName): Promise<string> => {
  let imageUrl = ''

  try {
    imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: fileName },
        (err, res) => {
          if (err) reject(err)
          else resolve(res.secure_url)
        }
      )
      createReadStream().pipe(stream)
    })
  } catch (err) {
    console.error(err)
  }

  return imageUrl
}
