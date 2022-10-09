import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import ProductsTable from '../../../components/products/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_PRODUCT}>
      <ProductsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Products' })
