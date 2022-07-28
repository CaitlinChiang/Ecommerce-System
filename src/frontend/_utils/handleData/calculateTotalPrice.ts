export const calculateTotalPrice = (price: number, quantity: number): number => {
  if (!price) return 0

  const totalPrice = price * quantity

  return parseFloat(Number(totalPrice).toFixed(2))
}
