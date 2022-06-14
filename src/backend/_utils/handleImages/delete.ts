const cloudinary = require('../setup/cloudinary')

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return

  await cloudinary.uploader.destroy(imageUrl, (res) => console.log(res))
}
