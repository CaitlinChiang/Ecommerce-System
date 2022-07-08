export const formatShippingFee = (shippingFee: string): number | null => {
  if (!shippingFee) return null

  return parseFloat(Number(shippingFee)?.toFixed(2))
}
