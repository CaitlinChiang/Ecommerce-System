export const clearFields = (args: any): any => {
  const clearedArgs: any = {}

  Object.keys(args).forEach((key: string): void => {
    switch (key) {
      case 'showPublic':
        clearedArgs[key] = false
        break
      case 'featured':
        clearedArgs[key] = false
        break
      case 'shippingFee':
        clearedArgs[key] = 0
        break
      default:
        clearedArgs[key] = ''
    }
  })

  return clearedArgs
}
