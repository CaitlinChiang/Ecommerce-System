export const formatStockQuantity = (stockQuantity: number): number | null => {
  if (!stockQuantity) return null

  return Math.round(stockQuantity)
}
