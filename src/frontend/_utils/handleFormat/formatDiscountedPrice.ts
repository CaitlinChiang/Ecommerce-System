export const formatDiscountedPrice = (
  discount: number,
  price: number
): string | null => {
  if (!price) return null
  if (!discount) return 'P' + price.toFixed(2)

  const discountPrice = price * discount
  const newPrice = price - discountPrice
  const formattedNewPrice = newPrice.toFixed(2)

  return 'P' + formattedNewPrice
}
