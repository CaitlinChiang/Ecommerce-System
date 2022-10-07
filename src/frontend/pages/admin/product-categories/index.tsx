import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import ProductCategoriesTable from '../../../components/productCategories/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_PRODUCT_CATEGORY}>
      <ProductCategoriesTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Product Categories' })
