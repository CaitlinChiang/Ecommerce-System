import { StockQuantity } from '../../../types/common/stockQuantity'
import { StockQuantityOperator } from '../../_enums/stockQuantity'

export const stockQuantityArgs = (args: any, stockQuantity: StockQuantity): void => {
  switch (stockQuantity.operator) {
    case StockQuantityOperator.ABOVE:
      args.stockQuantity = { $gt: stockQuantity.value1 }
      break
    case StockQuantityOperator.BELOW:
      args.stockQuantity = { $lt: stockQuantity.value1 }
      break
    case StockQuantityOperator.BETWEEN:
      args.stockQuantity = {
        $gt: stockQuantity.value1,
        $lt: stockQuantity.value2
      }
      break
    case StockQuantityOperator.EQUAL:
      args.stockQuantity = stockQuantity.value1
  }
}
