export interface GetAnalyticsArgs {
  startDate: Date
  endDate: Date
}

export interface AnalyticsOrdersCount {
  date: string
  orders: number
}

export interface AnalyticsRevenueCount {
  date: string
  revenue: number
}
