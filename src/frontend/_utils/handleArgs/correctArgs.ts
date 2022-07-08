export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string) => {
    const val = args[key]

    if (typeof val === 'string') {
      modifyArgs(key, args)
    }
  })

  return args
}

const modifyArgs = (key: string, obj: any): any => {
  if (obj[key]?.trim().length === 0) {
    obj[key] = null
  }
}
