import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreateProductCategory from '../../../../components/productCategories/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_PRODUCT_CATEGORY}>
      <CreateProductCategory />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Create Product Category' })
