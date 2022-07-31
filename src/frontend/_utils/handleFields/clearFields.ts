export const clearFields = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    if (key === 'showPublic' || key === 'featured') {
      args[key] = false
    } else {
      args[key] = ''
    }
  })

  return args
}
