export const clearFields = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    switch (key) {
      case 'showPublic':
        args[key] = false
        break
      case 'featured':
        args[key] = false
        break
      case 'shippingFee':
        args[key] = 0
        break
      default:
        args[key] = ''
    }
  })

  return args
}
