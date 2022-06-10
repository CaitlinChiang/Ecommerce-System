export interface GetAnalyticsArgs {
  startDate: Date
  endDate: Date
}

export interface AnalyticsOrders {
  date: string
  orders: number
}

export interface AnalyticsRevenue {
  date: string
  revenue: number
}
