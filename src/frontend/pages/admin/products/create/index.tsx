import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreateProduct from '../../../../components/products/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_PRODUCT}>
      <CreateProduct />
    </AuthorizedAccess>
  )
}

export default layout(Page, {
  title: 'Create Product',
  backRoute: true
})
