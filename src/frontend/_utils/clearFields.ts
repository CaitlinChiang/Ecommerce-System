export const clearFields = (args: any): void => {
  Object.keys(args).forEach((key) => {
    args[key] = null
  })
}
