const cloudinary = require('./cloudinarySetup')

export const handleDeleteImage = async (imageUrl) => {
  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}
