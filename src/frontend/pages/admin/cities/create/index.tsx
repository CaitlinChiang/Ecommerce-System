import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreateCity from '../../../../components/cities/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_CITY}>
      <CreateCity />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Create City & Shipping Fee' })
