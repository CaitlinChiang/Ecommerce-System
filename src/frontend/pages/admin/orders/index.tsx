import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import OrdersTable from '../../../components/orders/View/administrators/table'
import NoPermissions from '../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_ORDER)) return <NoPermissions />

  return (
    <>
      <OrdersTable />
    </>
  )
}

export default layout(Page, { title: 'Orders' })
