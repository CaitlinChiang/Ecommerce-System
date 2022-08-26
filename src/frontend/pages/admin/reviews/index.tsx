import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import ReviewsTable from '../../../components/reviews/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_REVIEW}>
      <ReviewsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Reviews' })
