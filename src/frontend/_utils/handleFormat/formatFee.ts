export const formatFee = (fee: number | string): number | null => {
  if (!fee) return null

  return parseFloat(Number(fee)?.toFixed(2))
}
