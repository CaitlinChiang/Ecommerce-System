export const formatToPercentage = (discount: number): string => {
  if (!discount) return '-'

  const discountWholeNumber = String(discount * 100)

  return discountWholeNumber + '%'
}
