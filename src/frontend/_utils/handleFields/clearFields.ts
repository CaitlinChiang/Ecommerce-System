export const clearFields = (args: any): any => {
  Object.keys(args).forEach((key) => {
    if (key === 'showPublic' || key === 'featured') {
      args[key] = false
    } else {
      args[key] = ''
    }
  })

  return args
}
