import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import CreateProduct from '../../../../components/products/Create'
import NoPermissions from '../../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.CREATE_PRODUCT)) return <NoPermissions />

  return (
    <>
      <CreateProduct />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product',
  backRoute: true
})
