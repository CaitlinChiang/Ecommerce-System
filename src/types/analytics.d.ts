import { DateRange } from './common/dateRange'

export interface GetAnalyticsArgs {
  dateRange: DateRange
}

export interface AnalyticsOrdersCount {
  date: string
  orders: number
}

export interface AnalyticsRevenueCount {
  date: string
  revenue: number
}
