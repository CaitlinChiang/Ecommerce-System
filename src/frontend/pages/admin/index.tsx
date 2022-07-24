import { ReactElement } from 'react'
import layout from '../../layouts/admin'
import OrdersChart from '../../components/analytics/View/orders/chart'
import RevenueChart from '../../components/analytics/View/revenue/chart'

const Page = (): ReactElement => {
  return (
    <>
      <OrdersChart />
      <RevenueChart />
    </>
  )
}

export default layout(Page, { title: 'Analytics' })
