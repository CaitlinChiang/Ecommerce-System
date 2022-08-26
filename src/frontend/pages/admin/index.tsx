import { ReactElement } from 'react'
import { AdminPermission } from '../../_enums/adminPermission'
import layout from '../../layouts/admin'
import OrdersChart from '../../components/analytics/View/orders/chart'
import RevenueChart from '../../components/analytics/View/revenue/chart'
import AuthorizedPath from 'frontend/components/users/Authorization'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_ANALYTICS}>
      <OrdersChart />
      <RevenueChart />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Home' })
