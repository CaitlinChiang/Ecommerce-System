import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import OrdersTable from '../../../components/orders/View/administrators/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_ORDER}>
      <OrdersTable />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Orders' })
