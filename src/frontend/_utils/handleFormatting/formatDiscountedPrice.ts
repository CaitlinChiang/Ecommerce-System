export const formatDiscountedPrice = (
  discount: number,
  price: number
): string | null => {
  if (!price) return null

  return 'P ' + parseFloat(Number(price * discount)?.toFixed(2))
}
