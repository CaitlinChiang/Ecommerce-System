const cloudinary = require('../setup/cloudinary')

export const deleteImage = async (imageUrl) => {
  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}
