import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreateUser from '../../../../components/users/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_USER}>
      <CreateUser />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Create Administrator' })
