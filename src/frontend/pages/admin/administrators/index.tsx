import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import AdministratorsTable from '../../../components/users/View/administrators/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_USER}>
      <AdministratorsTable />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Administrators' })
