import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import CustomersTable from '../../../components/users/View/customers/table'
import NoPermissions from '../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_USER)) return <NoPermissions />

  return (
    <>
      <CustomersTable />
    </>
  )
}

export default layout(Page, { title: 'Customers' })
