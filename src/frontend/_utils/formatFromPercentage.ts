export const formatFromPercentage = (discount: string) => {
  if (!discount) return

  const discountNumber = discount.substring(0, discount.indexOf('%'))
  const decimalNumber = Number(discountNumber) / 100

  return decimalNumber
}
