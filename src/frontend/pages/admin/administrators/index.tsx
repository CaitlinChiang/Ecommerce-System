import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import AdministratorsTable from '../../../components/users/View/administrators/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_ADMINISTRATOR}>
      <AdministratorsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Administrators' })
