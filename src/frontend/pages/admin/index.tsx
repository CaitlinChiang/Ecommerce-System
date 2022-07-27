import { ReactElement } from 'react'
import { AdminPermission } from '../../_enums/adminPermission'
import layout from '../../layouts/admin'
import OrdersChart from '../../components/analytics/View/orders/chart'
import RevenueChart from '../../components/analytics/View/revenue/chart'
import WelcomeBack from '../../components/_common/WelcomeBack'
import { authenticateUser } from '../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_ANALYTICS)) return <WelcomeBack />

  return (
    <>
      <OrdersChart />
      <RevenueChart />
    </>
  )
}

export default layout(Page, { title: 'Home' })
