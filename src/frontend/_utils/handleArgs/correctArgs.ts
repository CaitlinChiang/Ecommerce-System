export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    modifyArgs(args, key)
  })

  return args
}

const modifyArgs = (args: any, key: string): any => {
  if (args[key]?.trim().length === 0) {
    args[key] = null
  }
}
