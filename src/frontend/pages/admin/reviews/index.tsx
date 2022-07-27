import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import ReviewsTable from '../../../components/reviews/View/table'
import NoPermissions from '../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_REVIEW)) return <NoPermissions />

  return (
    <>
      <ReviewsTable />
    </>
  )
}

export default layout(Page, { title: 'Reviews' })
