const cloudinary = require('./cloudinarySetup')

export const deleteImage = async (imageUrl) => {
  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}
