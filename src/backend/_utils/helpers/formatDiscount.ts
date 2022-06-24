export const formatDiscount = (discount: number): string => {
  const discountWholeNumber = String(discount * 100)

  return discountWholeNumber + '%'
}
