export const formatFromPercentage = (discount: string) => {
  const discountNumber = discount.substring(0, discount.indexOf('%'))
  const decimalNumber = Number(discountNumber) / 100

  return decimalNumber
}
