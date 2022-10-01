export const formatPrice = (price: number): string => {
  if (!price) return '0.00'

  return String(price.toFixed(2))
}
