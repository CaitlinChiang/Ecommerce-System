export const formatTableHeader = (field: string): string => {
  const newString = field.replace(/([A-Z])/g, ' $1')
  const newStringWithCapitalization =
    newString.charAt(0).toUpperCase() + newString.slice(1)

  return newStringWithCapitalization
}
