import { ReactElement } from 'react'
import layout from '../../../layouts'
import OrdersChart from '../../../components/analytics/Showcase/orders/chart'
import RevenueChart from '../../../components/analytics/Showcase/revenue/chart'

const Page = (): ReactElement => {
  return (
    <>
      <OrdersChart />
      <RevenueChart />
    </>
  )
}

export default layout(Page, { title: 'Analytics' })
