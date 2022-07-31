export const formatText = (field: string): string => {
  if (!field) return ''

  const newString = field.replace(/([A-Z])/g, ' $1')
  const newStringWithCapitalization =
    newString.charAt(0).toUpperCase() + newString.slice(1)

  return newStringWithCapitalization
}
