import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import CitiesTable from '../../../components/cities/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_CITY}>
      <CitiesTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Cities & Shipping Fees' })
