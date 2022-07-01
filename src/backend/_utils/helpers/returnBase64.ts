const toBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file) {
      return null
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (): void => resolve(reader.result as string)
    reader.onerror = (error): void => reject(error)
  })

export const returnBase64 = async (file: File): Promise<string> => {
  const imageData = await toBase64(file)

  return imageData
}
