import { StockQuantityOperator } from '../../_enums/stockQuantityOperator'

export interface StockQuantity {
  operator?: StockQuantityOperator
  value1?: number
  value2?: number
}
