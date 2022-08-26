import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedPath from '../../../../components/users/Authorization'
import CreateProduct from '../../../../components/products/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.CREATE_PRODUCT}>
      <CreateProduct />
    </AuthorizedPath>
  )
}

export default layout(Page, {
  title: 'Create Product',
  backRoute: true
})
