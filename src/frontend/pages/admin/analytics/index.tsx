import { ReactElement } from 'react'
import layout from '../../../layouts'
import OrdersChart from '../../../components/analytics/Showcase/orders/chart'

const Page = (): ReactElement => {
  return (
    <>
      <OrdersChart />
    </>
  )
}

export default layout(Page, { title: 'Analytics' })
