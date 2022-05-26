const cloudinary = require('../setup/cloudinary')

export const handleDeleteImage = async (imageUrl) => {
  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}
