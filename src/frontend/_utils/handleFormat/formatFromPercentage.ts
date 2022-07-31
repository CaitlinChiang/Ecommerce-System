export const formatFromPercentage = (discount: string): number | null => {
  if (!discount) return null

  const discountString = String(discount)

  const discountNumber = discountString.substring(0, discountString.indexOf('%'))
  const decimalNumber = Number(discountNumber) / 100

  return decimalNumber
}
