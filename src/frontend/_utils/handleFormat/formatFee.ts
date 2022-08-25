export const formatFee = (fee: number | string): number | null => {
  if (!fee) return 0

  return parseFloat(Number(fee)?.toFixed(2))
}
