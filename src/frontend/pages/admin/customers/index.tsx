import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import CustomersTable from '../../../components/users/View/customers/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_USER}>
      <CustomersTable />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Customers' })
