export const clearFields = (args: any): void => {
  Object.keys(args).forEach((key) => {
    if (key == 'showPublic') {
      args[key] = false
    } else {
      args[key] = ''
    }
  })

  return args
}
