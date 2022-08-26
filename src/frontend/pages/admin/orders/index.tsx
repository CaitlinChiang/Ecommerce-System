import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import OrdersTable from '../../../components/orders/View/administrators/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_ORDER}>
      <OrdersTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Orders' })
