export const clearFields = (args: any): void => {
  Object.keys(args).forEach((key) => {
    if (['showPublic', 'featured'].includes(key)) {
      args[key] = false
    } else {
      args[key] = ''
    }
  })
}
