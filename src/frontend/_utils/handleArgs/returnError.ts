export const returnError = ({
  args,
  error,
  nestedProp,
  targetProp
}: {
  args: any
  error: boolean
  nestedProp?: string
  targetProp: string
}): boolean => {
  let emptyArgs = !args?.[targetProp]

  if (nestedProp) {
    emptyArgs = !args?.[targetProp]?.[nestedProp]
  }

  if (error && emptyArgs) return true

  return false
}
