export const formatPrice = (price: number): number => {
  if (!price) return 0
  return parseFloat(Number(price).toFixed(2))
}
