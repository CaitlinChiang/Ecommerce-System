import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import ReviewsTable from '../../../components/reviews/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_REVIEW}>
      <ReviewsTable />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Reviews' })
