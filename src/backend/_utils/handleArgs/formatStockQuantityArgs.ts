import { StockQuantity } from '../../../types/common/stockQuantity'
import { StockQuantityOperator } from '../../_enums/stockQuantity'

export const formatStockQuantityArgs = (
  modifiedArgs: any,
  stockQuantity: StockQuantity
): void => {
  switch (stockQuantity.operator) {
    case StockQuantityOperator.ABOVE:
      modifiedArgs.stockQuantity = { $gt: stockQuantity.value1 }
      break
    case StockQuantityOperator.BELOW:
      modifiedArgs.stockQuantity = { $lt: stockQuantity.value1 }
      break
    case StockQuantityOperator.BETWEEN:
      modifiedArgs.stockQuantity = {
        $gt: stockQuantity.value1,
        $lt: stockQuantity.value2
      }
      break
    case StockQuantityOperator.EQUAL:
      modifiedArgs.stockQuantity = stockQuantity.value1
  }
}
