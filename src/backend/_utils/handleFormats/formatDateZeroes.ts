export const formatDateZeroes = (number: string): string => {
  if (String(number).length === 1) {
    return '0' + number
  }
  return number
}
