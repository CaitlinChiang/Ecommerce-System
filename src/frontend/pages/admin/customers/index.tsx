import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import CustomersTable from '../../../components/users/View/customers/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_CUSTOMER}>
      <CustomersTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Customers' })
