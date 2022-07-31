export const formatFee = (fee: string): number | null => {
  if (!fee) return null

  return parseFloat(Number(fee)?.toFixed(2))
}
