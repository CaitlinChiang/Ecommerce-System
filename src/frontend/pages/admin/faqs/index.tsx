import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import FAQsDropdowns from '../../../components/faqs/View/administrators/dropdowns'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_FAQ}>
      <FAQsDropdowns />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
