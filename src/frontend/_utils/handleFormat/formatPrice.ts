export const formatPrice = (price: number): string => {
  if (!price) return '0.00'

  const parsedNumber = price.toFixed(2)

  return String(parsedNumber)
}
